import { BaseRequestBuilder } from './BaseRequestBuilder';

export class DeleteRequestBuilder extends BaseRequestBuilder {
  constructor(url: string) {
    super('DELETE', url);
  }
}
