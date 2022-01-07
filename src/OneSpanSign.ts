import { Api } from './api';
import { DocumentResource, PackageResource } from './resources';

/**
 * Main class to interact with OneSpan Sign's API. This class is a
 * collection of resource objects used to interact with OneSpan Sign's API.
 * @public
 */
export class OneSpanSign {
  public documents: DocumentResource;
  public packages: PackageResource;

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
    const api = new Api(apiKey, apiUrl);

    this.documents = new DocumentResource(api);
    this.packages = new PackageResource(api);
  }
}
