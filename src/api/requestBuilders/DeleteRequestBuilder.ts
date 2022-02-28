import { PostRequestBuilder } from './PostRequestBuilder';

/** @public */
export class DeleteRequestBuilder extends PostRequestBuilder {
  protected override method = 'DELETE';
}
