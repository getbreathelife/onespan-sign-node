import { Api } from '../api';

/**
 * Base class for resources. Resource classes are used to call endpoints specific
 * to the resource (entity) on OneSpan Sign.
 * @public
 */
export abstract class Resource {
  /**
   * Constructs an instance of the resource class.
   *
   * @param api - RequestBuilder factory class
   */
  constructor(protected api: Api) {}
}
