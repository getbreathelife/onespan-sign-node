import { URL } from 'node:url';

import { AccessTokenOwnerConfig, AccessTokenSenderConfig } from '../types';
import { DeleteRequestBuilder, GetRequestBuilder, PostRequestBuilder, PutRequestBuilder } from './requestBuilders';

/**
 * Factory class to create RequestBuilders based on the request method.
 * @public
 */
export class Api {
  protected accessToken?: string;
  protected tokenExpiry?: number;

  // TODO - #19 Document RequestBuilder classes/methods

  /**
   * Constructs an instance of the `Api` class.
   *
   * @param accessTokenConfig - Configuration to retrieve access tokens to authenticate API requests.
   * @param apiUrl - Url for the OneSpan Sign API server. This is the base URL for every request.
   *
   * @remarks
   * - For information on how to create a Client App and retrieve the ID and secret,
   *   see {@link https://community.onespan.com/documentation/onespan-sign/guides/admin-guides/user/integration | Integration (OneSpan)}.
   *
   * - A list of server URLs can be found at {@link https://community.onespan.com/documentation/onespan-sign/guides/quick-start-guides/developer/environment-urls-ip-addresses | Environment URLs & IP Addresses (OneSpan)}.
   */
  constructor(
    protected readonly accessTokenConfig: AccessTokenOwnerConfig | AccessTokenSenderConfig,
    protected readonly apiUrl: string
  ) {}

  /**
   * Helper function to determine if the currently stored access token is invalid.
   * An invalid access token is either undefined or expired.
   *
   * @internal
   */
  protected isAccessTokenInvalid(): boolean {
    return !this.accessToken || !this.tokenExpiry || this.tokenExpiry <= Date.now();
  }

  /**
   * Helper function to return the proper Authorization header for a request.
   *
   * If the access token is {@link isAccessTokenInvalid | invalid}, it'll attempt to
   * fetch a new token from OneSpan's access token endpoint.
   *
   * @remarks
   * See {@link https://www.onespan.com/blog/onespan-sign-release-1134-api-token-client-application | API Token for Client Application (OneSpan)}.
   *
   * @internal
   */
  protected async getAuthorizationHeader(): Promise<string> {
    if (this.isAccessTokenInvalid()) {
      const request = new PostRequestBuilder(new URL('/apitoken/clientApp/accessToken', this.apiUrl))
        .withBody(this.accessTokenConfig)
        .fetch();

      const response = (await (await request).json()) as { accessToken: string; expiresAt: number };

      this.accessToken = response.accessToken;
      this.tokenExpiry = response.expiresAt;
    }

    return `Bearer ${this.accessToken}`;
  }

  /**
   * Sends a `GET` request.
   *
   * @param url - URL of the request.
   *
   * @public
   */
  public get(url: string): GetRequestBuilder {
    return new GetRequestBuilder(new URL(url, this.apiUrl)).withAuthorizationHeader(
      this.getAuthorizationHeader.bind(this)
    );
  }

  /**
   * Sends a `POST` request.
   *
   * @param url - URL of the request.
   *
   * @public
   */
  public post(url: string): PostRequestBuilder {
    return new PostRequestBuilder(new URL(url, this.apiUrl)).withAuthorizationHeader(
      this.getAuthorizationHeader.bind(this)
    );
  }

  /**
   * Sends a `PUT` request.
   *
   * @param url - URL of the request.
   *
   * @public
   */
  public put(url: string): PostRequestBuilder {
    return new PutRequestBuilder(new URL(url, this.apiUrl)).withAuthorizationHeader(
      this.getAuthorizationHeader.bind(this)
    );
  }

  /**
   * Sends a `DELETE` request.
   *
   * @param url - URL of the request.
   *
   * @public
   */
  public delete(url: string): DeleteRequestBuilder {
    return new DeleteRequestBuilder(new URL(url, this.apiUrl)).withAuthorizationHeader(
      this.getAuthorizationHeader.bind(this)
    );
  }
}
