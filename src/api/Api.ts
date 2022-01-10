import { URL } from 'node:url';

import { DeleteRequestBuilder, GetRequestBuilder, PostRequestBuilder } from './requestBuilders';
import { PutRequestBuilder } from './requestBuilders/PutRequestBuilder';

/**
 * Factory class to create RequestBuilders based on the request method.
 * @public
 */
export class Api {
  // TODO - #19 Document RequestBuilder classes/methods

  /**
   * Constructs an instance of the `Api` class.
   *
   * @param apiKey - API key to interact with OneSpan Sign's API. This value is added to the `authorization` header at every request.
   * @param apiUrl - Url for the OneSpan Sign API server. This is the base URL for every request.
   *
   * @remarks
   * - For information on how to retrieve your API key, see {@link https://community.onespan.com/documentation/onespan-sign/guides/admin-guides/user/integration | Integration (OneSpan)}.
   *
   * - A list of server URLs can be found at {@link https://community.onespan.com/documentation/onespan-sign/guides/quick-start-guides/developer/environment-urls-ip-addresses | Environment URLs & IP Addresses (OneSpan)}.
   */
  constructor(protected readonly apiKey: string, protected readonly apiUrl: string) {}

  /**
   * Sends a `GET` request.
   *
   * @param url - URL of the request.
   *
   * @public
   */
  public get(url: string): GetRequestBuilder {
    return new GetRequestBuilder(new URL(url, this.apiUrl)).withAuthorizationHeader(`Basic ${this.apiKey}`);
  }

  /**
   * Sends a `POST` request.
   *
   * @param url - URL of the request.
   *
   * @public
   */
  public post(url: string): PostRequestBuilder {
    return new PostRequestBuilder(new URL(url, this.apiUrl)).withAuthorizationHeader(`Basic ${this.apiKey}`);
  }

  /**
   * Sends a `PUT` request.
   *
   * @param url - URL of the request.
   *
   * @public
   */
  public put(url: string): PostRequestBuilder {
    return new PutRequestBuilder(new URL(url, this.apiUrl)).withAuthorizationHeader(`Basic ${this.apiKey}`);
  }

  /**
   * Sends a `DELETE` request.
   *
   * @param url - URL of the request.
   *
   * @public
   */
  public delete(url: string): DeleteRequestBuilder {
    return new DeleteRequestBuilder(new URL(url, this.apiUrl)).withAuthorizationHeader(`Basic ${this.apiKey}`);
  }
}
