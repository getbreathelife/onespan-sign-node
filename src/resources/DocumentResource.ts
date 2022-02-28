import FormData from 'form-data';

import { DocumentMetadata, Requests, Responses } from '../types';
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
    documentBody: Requests.DocumentBody
  ): Promise<DocumentMetadata> {
    const formData = new FormData();
    formData.append('file', documentBody.body, { filename: documentBody.filename });
    formData.append('payload', JSON.stringify(payload));

    const response = await this.api.post(`/api/packages/${packageId}/documents`).withBody(formData).fetch();
    return (await response.json()) as DocumentMetadata;
  }

  /**
   * Uploads a document to an existing package.
   *
   * @param packageId - Package ID
   * @param documents - Metadata and data of the to-be-uploaded documents
   * @returns Metadata of the uploaded documents
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Documents/api.packages._packageId.documents.post | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/uploading-deleting-documents | Uploading & Deleting Documents (OneSpan)}
   */
  public async bulkCreate(
    packageId: string,
    documents: Requests.BulkCreateDocumentData[]
  ): Promise<DocumentMetadata[]> {
    const formData = new FormData();

    const payload: Requests.CreateDocumentData[] = [];

    documents.forEach((document) => {
      const { documentBody, ...metadata } = document;
      formData.append('file', documentBody.body, { filename: documentBody.filename });
      payload.push(metadata);
    });

    formData.append('payload', JSON.stringify(payload));

    const response = await this.api.post(`/api/packages/${packageId}/documents`).withBody(formData).fetch();
    return (await response.json()) as DocumentMetadata[];
  }

  /**
   * Retrieves metadata related to a given document.
   *
   * @param packageId - Package ID
   * @param documentId - Document ID
   * @returns Metadata of the document
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Documents/api.packages._packageId.documents._documentId.get | REST API documentation (OneSpan)}
   */
  public async getMetadata(packageId: string, documentId: string): Promise<DocumentMetadata> {
    const response = await this.api.get(`/api/packages/${packageId}/documents/${documentId}`).fetch();
    return (await response.json()) as DocumentMetadata;
  }

  /**
   * Retrieves all documents of a package in a zipped file.
   *
   * @param packageId - Package ID
   * @param flatten - (Optional) Flattens the PDFs
   * @returns Zipped documents of a package
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Documents/api.packages._packageId.documents.zip.get | REST API documentation (OneSpan)}
   */
  public async getAll(packageId: string, flatten?: boolean): Promise<Responses.Response> {
    return await this.api
      .get(`/api/packages/${packageId}/documents/zip`)
      .withQueryParams({
        flatten,
      })
      .withAcceptHeader('application/json, application/zip')
      .fetch();
  }

  /**
   * Updates the specified document.
   *
   * @param packageId - Package ID
   * @param documentId - ID of the document to be updated
   * @param payload - Updated metadata of the document
   * @param documentBody - (Optional) data to replace the document
   * @returns Updated metadata of the document
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Documents/api.packages._packageId.documents._documentId.put | REST API documentation (OneSpan)}
   */
  public async updateOne(
    packageId: string,
    documentId: string,
    payload: Partial<Omit<DocumentMetadata, 'id'>>,
    documentBody?: Requests.DocumentBody
  ): Promise<DocumentMetadata> {
    const request = await this.api.post(`/api/packages/${packageId}/documents/${documentId}`);

    if (!documentBody) {
      request.withBody(JSON.stringify(payload));
    } else {
      const formData = new FormData();
      formData.append('file', documentBody.body, { filename: documentBody.filename });
      formData.append('payload', JSON.stringify(payload));
    }

    const response = await request.fetch();

    return (await response.json()) as DocumentMetadata;
  }
}
