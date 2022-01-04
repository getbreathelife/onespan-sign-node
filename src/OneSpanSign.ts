import FormData from 'form-data';

import { Api } from './api';
import {
  CreatePackageRequestPayload,
  CreatePackageResponsePayload,
  DocumentMetadata,
  UploadDocumentRequestPayload,
} from './types';

/**
 * Main class to interact with OneSpan Sign's API
 * @public
 */
export class OneSpanSign {
  /**
   * Constructs an instance of the `OneSpanSign` class.
   *
   * @param apiKey - API key to interact with OneSpan Sign's API
   * @param apiUrl - Url for the OneSpan Sign API server
   *
   * @remarks
   * - For information on how to retrieve your API key, see {@link https://community.onespan.com/documentation/onespan-sign/guides/admin-guides/user/integration | Integration (OneSpan)}.
   *
   * - A list of server URLs can be found at {@link https://community.onespan.com/documentation/onespan-sign/guides/quick-start-guides/developer/environment-urls-ip-addresses | Environment URLs & IP Addresses (OneSpan)}.
   */
  constructor(private readonly apiKey: string, private readonly apiUrl: string) {}

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
  public async createPackage(payload: CreatePackageRequestPayload): Promise<CreatePackageResponsePayload> {
    const response = await Api.post(`${this.apiUrl}/api/packages`)
      .withAuthorizationHeader(`Basic ${this.apiKey}`)
      .withBody(payload)
      .fetch();

    return (await response.json()) as CreatePackageResponsePayload;
  }

  /**
   * Uploads a document to an existing package.
   *
   * @param packageId - Package ID
   * @param payload - Metadata of the to-be-uploaded document
   * @param documentBody - Data of the document
   * @returns Metadata of the uploaded document
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Documents/api.packages._packageId.documents.post | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/uploading-deleting-documents | Uploading & Deleting Documents (OneSpan)}
   */
  public async uploadDocument(
    packageId: string,
    payload: UploadDocumentRequestPayload,
    documentBody: Buffer | ReadableStream
  ): Promise<DocumentMetadata> {
    const formData = new FormData();
    formData.append('file', documentBody, { filename: payload.name });
    formData.append('payload', payload);

    const response = await Api.post(`${this.apiUrl}/api/packages/${packageId}/documents`)
      .withAuthorizationHeader(`Basic ${this.apiKey}`)
      .withBody(formData)
      .fetch();

    return (await response.json()) as DocumentMetadata;
  }
}
