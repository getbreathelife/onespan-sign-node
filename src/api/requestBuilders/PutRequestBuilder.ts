import { PostRequestBuilder } from './PostRequestBuilder';

export class PutRequestBuilder extends PostRequestBuilder {
  protected override method = 'PUT';
}
