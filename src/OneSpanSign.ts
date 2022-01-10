import { Api } from './api';
import { DocumentResource, PackageResource } from './resources';

/**
 * Main class to interact with OneSpan Sign's API. This class is a
 * collection of resource objects used to interact with OneSpan Sign's API.
 * @public
 */
export class OneSpanSign {
  protected api: Api;

  /**
   * Constructs an instance of the `OneSpanSign` class.
   *
   * @param apiKey - API key to interact with OneSpan Sign's API
   * @param apiUrl - Url for the OneSpan Sign API server
   *
   * @remarks
   * - For information on how to retrieve your API key, see {@link https://community.onespan.com/documentation/onespan-sign/guides/admin-guides/user/integration | Integration (OneSpan)}.
   *
   * - A list of server URLs can be found at {@link https://community.onespan.com/documentation/onespan-sign/guides/quick-start-guides/developer/environment-urls-ip-addresses | Environment URLs & IP Addresses (OneSpan)}.
   */
  constructor(apiKey: string, apiUrl: string) {
    this.api = new Api(apiKey, apiUrl);
  }

  /**
   * Individual resource objects are lazily initialized. When a getter for the resource is called,
   * the resource object will be initialized and shadows the getter function as an object property.
   *
   * Inspiration: https://stackoverflow.com/a/37978698/14163928
   */

  /**
   * Document resource
   */
  public get documents(): DocumentResource {
    const documents = new DocumentResource(this.api);
    Object.defineProperty(this, 'documents', {
      value: documents,
      writable: false,
      configurable: false,
    });
    return documents;
  }

  /**
   * Package resource
   */
  public get packages(): PackageResource {
    const packages = new PackageResource(this.api);
    Object.defineProperty(this, 'packages', {
      value: packages,
      writable: false,
      configurable: false,
    });
    return packages;
  }
}
