import { ExportedAuditTrail, Package, Requests, Responses } from '../types';
import { serializeDate } from '../utils/serializeDate';
import { Resource } from './Resource';

/**
 * Resource class to interact with
 * {@link https://community.onespan.com/documentation/onespan-sign/guides/sender-guides/user/transactions | packages (transactions)}.
 * @public
 */
export class PackageResource extends Resource {
  /**
   * Creates a package (transaction).
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages.post | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/creating-transaction-sender | Creating a Transaction for a Sender (OneSpan)}
   *
   * @param payload - Package initial information
   * @returns A payload that contains the ID of the newly created package.
   * @public
   */
  public async create(payload: Requests.CreatePackageData): Promise<Responses.CreatePackage> {
    const response = await this.api.post('/api/packages').withBody(payload).fetch();
    return response.json();
  }

  /**
   * Retrieves all packages (transactions).
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages.get | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/retrieving-list-transactions | Retrieving a List of Transactions (OneSpan)}
   *
   * @param params - Additional parameters for the query
   * @returns A payload that contains the result count and an array of the matched packages.
   * @public
   */
  public async getAll(params?: Requests.GetAllPackagesParameters): Promise<Responses.BulkGetResponse<Package>> {
    const request = await this.api.get('/api/packages');

    if (params) {
      const { lastUpdatedEndDate, lastUpdatedStartDate } = params;

      const queryParameters = {
        ...params,
        lastUpdatedStartDate: serializeDate(lastUpdatedStartDate),
        lastUpdatedEndDate: serializeDate(lastUpdatedEndDate),
      };

      request.withQueryParams(queryParameters);
    }

    const response = await request.fetch();
    return response.json();
  }

  /**
   * Retrieves a single package (transaction).
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages._packageId.get | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/creating-transaction-sender | Creating a Transaction for a Sender (OneSpan)}
   *
   * @param packageId - Package ID
   * @returns The package associated with the given ID.
   * @public
   */
  public async getOne(packageId: string): Promise<Package> {
    const response = await this.api.get(`/api/packages/${packageId}`).fetch();
    return response.json();
  }

  /**
   * Updates the information pertaining to a specified package (transaction).
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages._packageId.post | REST API documentation (OneSpan)}
   *
   * @param packageId - Package ID
   * @param payload - Package information
   * @public
   */
  public async update(packageId: string, payload: Requests.UpdatePackageData): Promise<void> {
    await this.api.put(`/api/packages/${packageId}`).withBody(payload).fetch();
  }

  /**
   * Deletes a package (transaction).
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages._packageId.delete | REST API documentation (OneSpan)}
   *
   * @param packageId - Package ID
   * @public
   */
  public async delete(packageId: string): Promise<void> {
    await this.api.delete(`/api/packages/${packageId}`).fetch();
  }

  /**
   * Retrieves audit details about a package (transaction).
   * The Audit Trail is embedded directly in the package, and can be viewed any time.
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages._packageId.audit.get | REST API documentation (OneSpan)}
   *
   * @param packageId - Package ID
   * @returns The audit trail of the package.
   * @public
   */
  public async getAuditTrail(packageId: string): Promise<ExportedAuditTrail> {
    const response = await this.api.get(`/api/packages/${packageId}/audit`).fetch();
    return response.json();
  }

  /**
   * Retrieves Evidence Summary information for a specified package (transaction).
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages._packageId.evidence.summary.get | REST API documentation (OneSpan)}
   *
   * @param packageId - Package ID
   * @returns An object that implements the {@link Responses.Response | Response} interface.
   * @public
   */
  public async getEvidenceSummary(packageId: string): Promise<Responses.Response> {
    return this.api.get(`/api/packages/${packageId}/evidence/summary`).withAcceptHeader('application/pdf').fetch();
  }
}
