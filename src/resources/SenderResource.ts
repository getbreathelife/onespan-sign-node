import FormData from 'form-data';
import { Readable } from 'node:stream';

import { Requests, Responses, Sender } from '../types';
import { Resource } from './Resource';

/**
 * Resource class to interact with
 * {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/managing-senders | senders}.
 * @public
 */
export class SenderResource extends Resource {
  /**
   * Creates a new sender.
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Senders/api.account.senders.post | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/managing-senders | Managing Senders (OneSpan)}
   *
   * @param payload - Initial sender data
   * @returns The created sender
   * @public
   */
  public async create(payload: Requests.CreateSenderData): Promise<Sender> {
    const response = await this.api.post('/api/account/senders').withBody(payload).fetch();
    return response.json();
  }

  /**
   * Retrieves a list of the users in an account. Optional query parameters can be used to filter the list.
   * By default, only one sender is retrieved. To retrieve additional users you must modify the “to” and “from” parameters,
   * where each number in the parameter corresponds to a user. For example: to = 3 from = 10 will return users 3 to 10 in the user list.
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Senders/api.account.senders.get | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/managing-senders | Managing Senders (OneSpan)}
   *
   * @param params - Additional parameters for the query
   * @returns A payload that contains the result count and an array of the matched senders.
   * @public
   */
  public async getAll(params?: Requests.GetAllSendersParameters): Promise<Responses.BulkGetResponse<Sender>> {
    const request = this.api.get('/api/account/senders');

    if (params) {
      request.withQueryParams({ ...params });
    }

    const response = await request.fetch();
    return response.json();
  }

  /**
   * Retrieves detailed Account information about a specified user.
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Senders/api.account.senders._senderId.get | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/managing-senders | Managing Senders (OneSpan)}
   *
   * @param id - Unique sender ID
   * @returns The sender associated wth the given ID.
   * @public
   */
  public async getOne(id: string): Promise<Sender> {
    const response = await this.api.get(`/api/account/senders/${id}`).fetch();
    return response.json();
  }

  /**
   * Deletes a specified Sender from an account.
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Senders/api.account.senders._senderId.delete | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/managing-senders | Managing Senders (OneSpan)}
   *
   * @param id - Unique sender ID
   * @public
   */
  public async delete(id: string): Promise<void> {
    await this.api.delete(`/api/account/senders/${id}`).fetch();
  }

  /**
   * Sends an email invitation to a user. The user will receive an invitation link and a token identifying the account.
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Senders/api.account.senders._senderId.invite.post | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/managing-senders | Managing Senders (OneSpan)}
   *
   * @param senderId - Unique sender ID
   * @returns The sender associated wth the given ID.
   * @public
   */
  public async invite(senderId: string): Promise<Sender> {
    const response = await this.api.post(`/api/account/senders/${senderId}/invite`).fetch();
    return response.json();
  }

  /**
   * Retrieves the image that is being used by a recipient as their default signature when signing a transaction.
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Senders/api.account.senders._senderId.signature.image.get | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/extracting-images-signatures | Extracting Images of Signatures (OneSpan)}
   *
   * @param senderId - Unique sender ID
   * @returns A payload that contains data of the signature image.
   * @public
   */
  public async getDefaultSignature(senderId: string): Promise<Responses.SignatureImage> {
    const response = await this.api.get(`/api/account/senders/${senderId}/signature/image`).fetch();
    const jsonResponse = await response.json();

    return {
      fileName: jsonResponse.fileName,
      mediaType: jsonResponse.mediaType,
      content: Buffer.from(jsonResponse.content, 'base64'),
    };
  }

  /**
   * Uploads an image to be used by a recipient as their default signature when signing a transaction.
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Senders/api.account.senders._senderId.signature.image.post | REST API documentation (OneSpan)}
   *
   * @param senderId - Unique sender ID
   * @param signatureImage - Image data to be used as the default signature
   * @public
   */
  public async setDefaultSignature(senderId: string, signatureImage: Buffer | Readable): Promise<void> {
    const formData = new FormData();
    formData.append('file', signatureImage);

    await this.api.post(`/api/account/senders/${senderId}/signature/image`).withBody(formData).fetch();
  }

  /**
   * Deletes the image that is being used by a recipient as their default signature when signing a transaction.
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Senders/api.account.senders._senderId.signature.image.delete | REST API documentation (OneSpan)}
   *
   * @param senderId - Unique sender ID
   * @public
   */
  public async deleteDefaultSignature(senderId: string): Promise<void> {
    await this.api.delete(`/api/account/senders/${senderId}/signature/image`).fetch();
  }
}
