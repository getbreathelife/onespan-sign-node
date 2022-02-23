import fetch, { RequestInit, Response } from 'node-fetch';

import { HttpResponseError } from '../error';

/**
 * Builder class to construct an api request.
 * @public
 */
export class BaseRequestBuilder {
  protected readonly method: string = 'GET';
  protected requestHeaders: Record<string, string> & {
    authorization?: string | (() => string) | (() => Promise<string>);
  };
  protected requestOptions: RequestInit = {};
  protected url: URL;

  constructor(url: URL) {
    this.url = url;

    // By default, we send data in JSON format and expects the API response to
    // also be in JSON
    this.requestHeaders = {
      accept: 'application/json',
      'content-type': 'application/json',
    };
  }

  /**
   * Sets the `Authorization` header of the request.
   * @param value - A static string value for the header
   *
   * @public
   */
  public withAuthorizationHeader(value: string): this;
  /**
   * Sets the `Authorization` header of the request.
   * @param value - A callback that returns the value for the header
   *
   * @public
   */
  public withAuthorizationHeader(value: () => string): this;
  /**
   * Sets the `Authorization` header of the request.
   * @param value - A callback that returns the value for the header
   *
   * @public
   */
  public withAuthorizationHeader(value: () => Promise<string>): this;
  public withAuthorizationHeader(value: string | (() => string) | (() => Promise<string>)): this {
    this.requestHeaders.authorization = value;
    return this;
  }

  /**
   * Sets the `Accept` header of the request.
   * @param value - A static string value for the header
   *
   * @public
   */
  public withAcceptHeader(value: string): this {
    this.requestHeaders.accept = value;
    return this;
  }

  /**
   * Replaces the query parameters in the request URL
   * @param params - Dictionary containing the query parameters
   *
   * @public
   */
  public withQueryParams(params: Record<string, string | number | boolean | null | undefined>): this {
    // Clean up null or undefined entries, and convert number values to strings
    const filteredParams = Object.fromEntries(
      Object.entries(params)
        // Cannot use is operator to assert non-null or non-undefined type on
        // destructured object: https://github.com/microsoft/TypeScript/issues/41173
        .filter(([, val]) => typeof val !== 'undefined' && val !== null)
        .map(([key, val]) => {
          return [key, (val as string | number | boolean).toString()];
        })
    );

    const search = new URLSearchParams(filteredParams);
    this.url.search = search.toString();
    return this;
  }

  /**
   * Constructs the header dictionary for the request.
   * @internal
   */
  protected async createHeaders(): Promise<Record<string, string>> {
    const { authorization, ...headers } = this.requestHeaders;

    if (authorization) {
      if (typeof authorization === 'function') {
        headers.authorization = await authorization();
      } else {
        headers.authorization = authorization;
      }
    }

    return headers;
  }

  /**
   * Handles the response of the HTTP request by throwing an appropriate error
   * or return the response as-is if the request is successful.
   *
   * @param response - `node-fetch` Response object returned after making the
   *                    configured request.
   *
   * @internal
   */
  protected handleResponse(response: Response): Response {
    if (response.ok) return response;
    throw new HttpResponseError(response);
  }

  /**
   * Initiates the configured request.
   * @public
   */
  public async fetch(): Promise<Response> {
    const response = await fetch(this.url, {
      ...this.requestOptions,
      method: this.method,
      headers: await this.createHeaders(),
    });

    return this.handleResponse(response);
  }
}
