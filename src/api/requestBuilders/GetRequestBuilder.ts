import { BaseRequestBuilder } from './BaseRequestBuilder';

/** @public */
export class GetRequestBuilder extends BaseRequestBuilder {
  protected override method = 'GET';
}
