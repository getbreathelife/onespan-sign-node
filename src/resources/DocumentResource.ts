import FormData from 'form-data';
import { Readable } from 'node:stream';

import { DocumentMetadata, Requests } from '../types';
import { Resource } from './Resource';

/**
 * Resource class to interact with
 * {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/uploading-deleting-documents | documents}.
 *
 * @public
 */
export class DocumentResource extends Resource {
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
  public async create(
    packageId: string,
    payload: Requests.CreateDocumentData,
    documentBody: Buffer | Readable
  ): Promise<DocumentMetadata> {
    const formData = new FormData();
    formData.append('file', documentBody, { filename: payload.name });
    formData.append('payload', JSON.stringify(payload));

    const response = await this.api.post(`/api/packages/${packageId}/documents`).withBody(formData).fetch();

    return (await response.json()) as DocumentMetadata;
  }
}
