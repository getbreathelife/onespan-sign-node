/**
 * Base class for resources. Resource classes are used to call endpoints specific
 * to the resource (entity) on OneSpan Sign.
 * @public
 */
export abstract class Resource {
  /**
   * Constructs an instance of the resource class.
   *
   * @param apiKey - API key to interact with OneSpan Sign's API
   * @param apiUrl - Url for the OneSpan Sign API server
   *
   * @remarks
   * - For information on how to retrieve your API key, see {@link https://community.onespan.com/documentation/onespan-sign/guides/admin-guides/user/integration | Integration (OneSpan)}.
   *
   * - A list of server URLs can be found at {@link https://community.onespan.com/documentation/onespan-sign/guides/quick-start-guides/developer/environment-urls-ip-addresses | Environment URLs & IP Addresses (OneSpan)}.
   */
  constructor(protected readonly apiKey: string, protected readonly apiUrl: string) {}
}
