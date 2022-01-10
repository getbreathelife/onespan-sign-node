import { Response } from 'node-fetch';

import { ExportedAuditTrail, Package, Requests, Responses } from '../types';
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
   * @returns A payload that contains the ID of the newly created package.
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages.post | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/creating-transaction-sender | Creating a Transaction for a Sender (OneSpan)}
   */
  public async create(payload: Requests.PackageData): Promise<Responses.CreatePackage> {
    const response = await this.api.post('/api/packages').withBody(payload).fetch();
    return (await response.json()) as Responses.CreatePackage;
  }

  /**
   * Retrieves all packages (transactions).
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages.get | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/retrieving-list-transactions | Retrieving a List of Transactions (OneSpan)}
   */
  public async getAll(params: Requests.GetAllPackagesParameters): Promise<Package[]> {
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
   * @param packageId - Package ID
   * @returns The package associated with the given ID.
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages._packageId.get | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/creating-transaction-sender | Creating a Transaction for a Sender (OneSpan)}
   */
  public async getOne(packageId: string): Promise<Package> {
    const response = await this.api.get(`/api/packages/${packageId}`).fetch();
    return (await response.json()) as Package;
  }

  /**
   * Updates the information pertaining to a specified package (transaction).
   *
   * @param packageId - Package ID
   * @param payload - Package information
   *
   * @remarks
   *- {@link https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages._packageId.post | REST API documentation (OneSpan)}
   */
  public async update(packageId: string, payload: Requests.PackageData): Promise<void> {
    await this.api.put(`/api/packages/${packageId}`).withBody(payload).fetch();
  }

  /**
   * Deletes a package (transaction).
   *
   * @param packageId - Package ID
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages._packageId.delete | REST API documentation (OneSpan)}
   */
  public async delete(packageId: string): Promise<void> {
    await this.api.delete(`/api/packages/${packageId}`).fetch();
  }

  /**
   * Retrieves audit details about a package (transaction).
   * The Audit Trail is embedded directly in the package, and can be viewed any time.
   *
   * @param packageId - Package ID
   * @returns The audit trail of the package.
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages._packageId.audit.get | REST API documentation (OneSpan)}
   */
  public async getAuditTrail(packageId: string): Promise<ExportedAuditTrail> {
    const response = await this.api.get(`/api/packages/${packageId}/audit`).fetch();
    return (await response.json()) as ExportedAuditTrail;
  }

  /**
   * Retrieves Evidence Summary information for a specified package (transaction).
   *
   * @param packageId - Package ID
   * @returns A {@link https://www.npmjs.com/package/node-fetch#class-response | `node-fetch` Response} object that exposes
   *          properties such as `body` or functions such as `arrayBuffer()` or `blob()` to retrieve the response data.
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages._packageId.evidence.summary.get | REST API documentation (OneSpan)}
   */
  public async getEvidenceSummary(packageId: string): Promise<Response> {
    return await this.api
      .get(`/api/packages/${packageId}/evidence/summary`)
      .withAcceptHeader('application/pdf')
      .fetch();
  }
}
