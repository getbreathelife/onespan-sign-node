import { DeleteRequestBuilder, GetRequestBuilder, PostRequestBuilder } from './requestBuilders';

// Factory class to create RequestBuilders based on the request method
export class Api {
  public static get(url: string): GetRequestBuilder {
    return new GetRequestBuilder(url);
  }

  public static post(url: string): PostRequestBuilder {
    return new PostRequestBuilder(url);
  }

  public static delete(url: string): DeleteRequestBuilder {
    return new DeleteRequestBuilder(url);
  }
}
