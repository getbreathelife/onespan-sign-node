import {
  PackageRequestPayload,
  CreatePackageResponsePayload,
  Package,
  GetAllPackagesRequestParameters,
} from '../types';
import { serializeDate } from '../utils/serializeDate';
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
  public async create(payload: PackageRequestPayload): Promise<CreatePackageResponsePayload> {
    const response = await this.api.post('/api/packages').withBody(payload).fetch();

    return (await response.json()) as CreatePackageResponsePayload;
  }

  /**
   * Retrieves all packages (transactions).
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages.get | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/retrieving-list-transactions | Retrieving a List of Transactions (OneSpan)}
   */
  public async getAll(params: GetAllPackagesRequestParameters): Promise<Package[]> {
    const { lastUpdatedEndDate, lastUpdatedStartDate } = params;

    const queryParameters = {
      ...params,
      lastUpdatedStartDate: serializeDate(lastUpdatedStartDate),
      lastUpdatedEndDate: serializeDate(lastUpdatedEndDate),
    };

    const response = await this.api.get('/api/packages').withQueryParams(queryParameters).fetch();

    return (await response.json()) as Package[];
  }

  /**
   * Retrieves a single package (transaction).
   *
   * @param id - Package ID
   * @returns The package associated with the given ID.
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages._packageId.get | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/creating-transaction-sender | Creating a Transaction for a Sender (OneSpan)}
   */
  public async getOne(id: string): Promise<Package> {
    const response = await this.api.get(`/api/packages/${id}`).fetch();

    return (await response.json()) as Package;
  }

  /**
   * Updates the information pertaining to a specified package (transaction).
   *
   * @param id - Package ID
   * @param payload - Package information
   */
  public async put(id: string, payload: PackageRequestPayload): Promise<void> {
    await this.api.put(`/api/packages/${id}`).withBody(payload).fetch();
  }
}
