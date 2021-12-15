import fetch, { RequestInit, Response } from 'node-fetch';

import { HttpResponseError } from '../error';

type RequestMethod = 'GET' | 'POST' | 'DELETE'; // can add more if needed

export class BaseRequestBuilder {
  protected requestHeaders: Record<string, string>;
  protected requestOptions: RequestInit;
  protected url: string;

  constructor(method: RequestMethod = 'GET', url: string) {
    this.url = url;

    // By default, we send data in JSON format and expects the API response to
    // also be in JSON
    this.requestHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    this.requestOptions = {
      method,
    };
  }

  protected handleResponse(response: Response): Response {
    if (response.ok) return response;
    throw new HttpResponseError(response);
  }

  public withAuthorizationHeader(value: string) {
    this.requestHeaders.Authorization = value;
    return this;
  }

  public accepts(value: string) {
    this.requestHeaders.Accept = value;
    return this;
  }

  public async fetch(): Promise<Response> {
    const response = await fetch(this.url, {
      ...this.requestOptions,
      headers: this.requestHeaders,
    });

    return this.handleResponse(response);
  }
}
