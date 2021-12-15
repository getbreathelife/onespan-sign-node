import FormData from 'form-data';

import { BaseRequestBuilder } from './BaseRequestBuilder';

export class PostRequestBuilder extends BaseRequestBuilder {
  constructor(url: string) {
    super('POST', url);
  }

  public withBody(body: Record<string, any> | FormData | string) {
    switch (typeof body) {
      case 'object':
        if (body instanceof FormData) {
          this.requestHeaders = {
            ...this.requestHeaders,
            ...body.getHeaders(),
          };
          this.requestOptions.body = body;
          return this;
        }

        this.requestHeaders['Content-Type'] = 'application/json';
        this.requestOptions.body = JSON.stringify(body);
        return this;

      case 'string':
        this.requestHeaders['Content-Type'] = 'text/plain';
        this.requestOptions.body = body;
        return this;
    }
  }
}
