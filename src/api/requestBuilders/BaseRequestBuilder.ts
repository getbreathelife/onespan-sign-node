import fetch, { FetchError, RequestInit, Response } from 'node-fetch';

import { ClientError, OneSpanResponseError } from '../error';

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
   * Initiates the configured request.
   * @public
   */
  public async fetch(): Promise<Response> {
    try {
      const response = await fetch(this.url, {
        ...this.requestOptions,
        method: this.method,
        headers: await this.createHeaders(),
      });

      // Return response if response status code is >= 200 && < 300
      if (response.ok) return response;

      // Otherwise, throw a OneSpanResponseError based on the response
      throw new OneSpanResponseError(await response.json(), response.status);
    } catch (err) {
      if (err instanceof FetchError || (err as any).name === 'AbortError') {
        throw new ClientError(err as Error);
      }
      throw err;
    }
  }
}
