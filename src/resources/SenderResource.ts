import FormData from 'form-data';
import { Readable } from 'node:stream';

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
   * where each number in the parameter corresponds to a user. For example: to = 3 from = 10 will return users 3 to 10 in the user list.
   *
   * @param params - Additional parameters for the query
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Senders/api.account.senders.get | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/managing-senders | Managing Senders (OneSpan)}
   */
  public async getAll(params?: Requests.GetAllSendersParameters): Promise<Responses.BulkGetResponse<Sender>> {
    const request = this.api.get('/api/account/senders');

    if (params) {
      request.withQueryParams({ ...params });
    }

    const response = await request.fetch();

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

  /**
   * Sends an email invitation to a user. The user will receive an invitation link and a token identifying the account.
   *
   * @param senderId - Unique sender ID
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Senders/api.account.senders._senderId.invite.post | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/managing-senders | Managing Senders (OneSpan)}
   */
  public async invite(senderId: string): Promise<Sender> {
    const response = await this.api.post(`/api/account/senders/${senderId}/invite`).fetch();
    return (await response.json()) as Sender;
  }

  /**
   * Retrieves the image that is being used by a recipient as their default signature when signing a transaction.
   *
   * @param senderId - Unique sender ID
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Senders/api.account.senders._senderId.signature.image.get | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/extracting-images-signatures | Extracting Images of Signatures (OneSpan)}
   */
  public async getDefaultSignature(senderId: string): Promise<Responses.SignatureImage> {
    const response = await (await this.api.get(`/api/account/senders/${senderId}/signature/image`).fetch()).json();
    return {
      fileName: response.fileName,
      mediaType: response.mediaType,
      content: Buffer.from(response.content, 'base64'),
    };
  }

  /**
   * Uploads an image to be used by a recipient as their default signature when signing a transaction.
   *
   * @param senderId - Unique sender ID
   * @param signatureImage - Image data to be used as the default signature
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Senders/api.account.senders._senderId.signature.image.post | REST API documentation (OneSpan)}
   */
  public async setDefaultSignature(senderId: string, signatureImage: Buffer | Readable): Promise<void> {
    const formData = new FormData();
    formData.append('file', signatureImage);

    await this.api.post(`/api/account/senders/${senderId}/signature/image`).withBody(formData).fetch();
  }

  /**
   * Deletes the image that is being used by a recipient as their default signature when signing a transaction.
   *
   * @param senderId - Unique sender ID
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Senders/api.account.senders._senderId.signature.image.delete | REST API documentation (OneSpan)}
   */
  public async deleteDefaultSignature(senderId: string): Promise<void> {
    await this.api.delete(`/api/account/senders/${senderId}/signature/image`).fetch();
  }
}
