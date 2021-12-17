import { BaseRequestBuilder } from './BaseRequestBuilder';

export class GetRequestBuilder extends BaseRequestBuilder {
  constructor(url: string) {
    super('GET', url);
  }
}
