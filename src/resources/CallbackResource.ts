import { Callback } from '../types/models/callback';
import { Resource } from './Resource';

/**
 * Resource class to interact with
 * {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/setting-callback-notifications | callbacks}.
 *
 * Callback event notifications allow you to be automatically notified of events pertaining to a package.
 * Upon a specific event, the system will automatically call a specified URL.
 *
 * @public
 */
export class CallbackResource extends Resource {
  /**
   * Retrieve registered callback settings.
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Callback/api.callback.get | REST API documentation (OneSpan)}
   */
  public async get(): Promise<Callback> {
    const response = await this.api.get('/api/callback').fetch();
    return response.json();
  }

  /**
   * Create callback settings.
   *
   * @param payload - Callback settings
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Callback/api.callback.post | REST API documentation (OneSpan)}
   */
  public async create(payload: Partial<Callback>): Promise<Callback> {
    const response = await this.api.post('/api/callback').withBody(payload).fetch();
    return response.json();
  }
}
