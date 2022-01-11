import FormData from 'form-data';

import { BaseRequestBuilder } from './BaseRequestBuilder';

/** @public */
export class PostRequestBuilder extends BaseRequestBuilder {
  protected override method = 'POST';

  public withBody(body: Record<string, any> | FormData | string): this {
    switch (typeof body) {
      case 'object':
        if (body instanceof FormData) {
          // Convert header keys to lower case
          const formDataHeaders = Object.fromEntries(
            Object.entries(body.getHeaders()).map(([key, val]) => [key.toLowerCase(), val])
          );

          this.requestHeaders = {
            ...this.requestHeaders,
            ...formDataHeaders,
          };
          this.requestOptions.body = body;
          return this;
        }

        this.requestHeaders['content-type'] = 'application/json';
        this.requestOptions.body = JSON.stringify(body);
        return this;

      case 'string':
        this.requestHeaders['content-type'] = 'text/plain';
        this.requestOptions.body = body;
        return this;
    }
  }
}
