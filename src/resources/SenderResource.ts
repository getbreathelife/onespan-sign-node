import { Requests, Responses, Sender } from '../types';
import { Resource } from './Resource';

/**
 * Resource class to interact with
 * {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/managing-senders | senders}.
 *
 * @public
 */
export class SenderResource extends Resource {
  /**
   * Creates a new sender.
   *
   * @param payload - Initial sender data
   * @returns The created sender
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Senders/api.account.senders.post | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/managing-senders | Managing Senders (OneSpan)}
   */
  public async create(payload: Requests.CreateSenderData): Promise<Sender> {
    const response = await this.api.post('/api/account/senders').withBody(payload).fetch();
    return (await response.json()) as Sender;
  }

  /**
   * Retrieves a list of the users in an account. Optional query parameters can be used to filter the list.
   * By default, only one sender is retrieved. To retrieve additional users you must modify the “to” and “from” parameters,
   * where each number in the parameter corresponds to a user. For example: to = 3 from = 10 Will return users 3 to 10 in the user list.
   *
   * @param params - Additional parameters for the query
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Senders/api.account.senders.get | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/managing-senders | Managing Senders (OneSpan)}
   */
  public async getAll(params: Requests.GetAllSendersParameters): Promise<Responses.BulkGetResponse<Sender>> {
    const response = await this.api
      .get('/api/account/senders')
      .withQueryParams({ ...params })
      .fetch();

    return (await response.json()) as Responses.BulkGetResponse<Sender>;
  }

  /**
   * Retrieves detailed Account information about a specified user.
   *
   * @param id - Unique sender ID
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Senders/api.account.senders._senderId.get | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/managing-senders | Managing Senders (OneSpan)}
   */
  public async getOne(id: string): Promise<Sender> {
    const response = await this.api.get(`/api/account/senders/${id}`).fetch();
    return (await response.json()) as Sender;
  }

  /**
   * Deletes a specified Sender from an account.
   *
   * @param id - Unique sender ID
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Senders/api.account.senders._senderId.delete | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/managing-senders | Managing Senders (OneSpan)}
   */
  public async delete(id: string): Promise<void> {
    await this.api.delete(`/api/account/senders/${id}`).fetch();
  }
}
