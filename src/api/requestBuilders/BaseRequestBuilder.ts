import fetch, { RequestInit, Response } from 'node-fetch';

import { HttpResponseError } from '../error';

/**
 * Builder class to construct an api request.
 * @public
 */
export class BaseRequestBuilder {
  protected readonly method: string = 'GET';
  protected requestHeaders: Record<string, string>;
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

  protected handleResponse(response: Response): Response {
    if (response.ok) return response;
    throw new HttpResponseError(response);
  }

  public withAuthorizationHeader(value: string): this {
    this.requestHeaders.authorization = value;
    return this;
  }

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
  public withQueryParams(params: Record<string, string | number | null | undefined>): this {
    // Clean up null or undefined entries, and convert number values to strings
    const filteredParams = Object.fromEntries(
      Object.entries(params)
        // Cannot use is operator to assert non-null or non-undefined type on
        // destructured object: https://github.com/microsoft/TypeScript/issues/41173
        .filter(([, val]) => typeof val !== 'undefined' && val !== null)
        .map(([key, val]) => {
          return [key, (val as string | number).toString()];
        })
    );

    const search = new URLSearchParams(filteredParams);
    this.url.search = search.toString();
    return this;
  }

  public async fetch(): Promise<Response> {
    const response = await fetch(this.url, {
      ...this.requestOptions,
      method: this.method,
      headers: this.requestHeaders,
    });

    return this.handleResponse(response);
  }
}
