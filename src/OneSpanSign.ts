import { Api } from './api';
import { DocumentResource, PackageResource, SenderResource } from './resources';
import { CallbackResource } from './resources/CallbackResource';
import { AccessTokenOwnerConfig, AccessTokenSenderConfig } from './types';

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
   * @param accessTokenConfig - Configuration to retrieve access tokens to authenticate API requests.
   * @param apiUrl - Url for the OneSpan Sign API server.
   *
   * @remarks
   * - For information on how to create a Client App and retrieve the ID and secret,
   *   see {@link https://community.onespan.com/documentation/onespan-sign/guides/admin-guides/user/integration | Integration (OneSpan)}.
   *
   * - A list of server URLs can be found at {@link https://community.onespan.com/documentation/onespan-sign/guides/quick-start-guides/developer/environment-urls-ip-addresses | Environment URLs & IP Addresses (OneSpan)}.
   *
   * @public
   */
  constructor(accessTokenConfig: AccessTokenOwnerConfig | AccessTokenSenderConfig, apiUrl: string) {
    this.api = new Api(accessTokenConfig, apiUrl);
  }

  /**
   * Individual resource objects are lazily initialized. When a getter for the resource is called,
   * the resource object will be initialized and shadows the getter function as an object property.
   *
   * Inspiration: https://stackoverflow.com/a/37978698/14163928
   */

  /**
   * Document resource
   * @public
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
   * @public
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

  /**
   * Sender resource
   * @public
   */
  public get senders(): SenderResource {
    const senders = new SenderResource(this.api);
    Object.defineProperty(this, 'senders', {
      value: senders,
      writable: false,
      configurable: false,
    });
    return senders;
  }

  /**
   * Callback resource
   * @public
   */
  public get callback(): CallbackResource {
    const callback = new CallbackResource(this.api);
    Object.defineProperty(this, 'callback', {
      value: callback,
      writable: false,
      configurable: false,
    });
    return callback;
  }
}
