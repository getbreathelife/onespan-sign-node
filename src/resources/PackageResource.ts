import { Api } from '../api';
import { CreatePackageRequestPayload, CreatePackageResponsePayload } from '../types';
import { Resource } from './Resource';

/**
 * Resource class to interact with
 * {@link https://community.onespan.com/documentation/onespan-sign/guides/sender-guides/user/transactions | packages (transactions)}.
 *
 * @public
 */
export class PackageResource extends Resource {
  /**
   * Creates a package (transaction).
   *
   * @param payload - Package initial information
   * @returns A payload that contains the ID of the newly created package
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages.post | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/creating-transaction-sender | Creating a Transaction for a Sender (OneSpan)}
   */
  public async create(payload: CreatePackageRequestPayload): Promise<CreatePackageResponsePayload> {
    const response = await Api.post(`${this.apiUrl}/api/packages`)
      .withAuthorizationHeader(`Basic ${this.apiKey}`)
      .withBody(payload)
      .fetch();

    return (await response.json()) as CreatePackageResponsePayload;
  }
}
