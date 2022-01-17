import { PostRequestBuilder } from './PostRequestBuilder';

/** @public */
export class PutRequestBuilder extends PostRequestBuilder {
  protected override method = 'PUT';
}
