import FormData from 'form-data';

import { DocumentMetadata, DocumentVisibility, RecursivePartial, Requests, Responses } from '../types';
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
    return response.json();
  }

  /**
   * Uploads multiple documents to an existing package.
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
    return response.json();
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
    return response.json();
  }

  /**
   * Retrieves the document in the original or PDF version.
   *
   * @param packageId - Package ID
   * @param documentId - Document ID
   * @param option - (Optional) Option to specify the format and parameters to retrieve the document.
   *                 Defaults to original format
   * @returns Document body
   *
   * @remarks
   * REST API documentation (OneSpan):
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Documents/api.packages._packageId.documents._documentId.original.get | Retrieve document in original format}
   *
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Documents/api.packages._packageId.documents._documentId.pdf.get | Retrieve document in PDF format}
   */
  public async getBody(
    packageId: string,
    documentId: string,
    option: Requests.GetDocumentBodyOption = { format: 'original' }
  ): Promise<Responses.Response> {
    const request = this.api
      .get(`/api/packages/${packageId}/documents/${option.format}`)
      .withAcceptHeader('application/octet-stream');

    if (option.format === 'pdf' && option.flatten !== undefined) {
      request.withQueryParams({ flatten: option.flatten });
    }

    return request.fetch();
  }

  /**
   * Retrieves a specific document page. The page is retrieved as a .png image file.
   *
   * @param packageId - Package ID
   * @param documentId - Document ID
   * @param pageIndex - Page index in the document
   * @returns PNG image data of the specified document page
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Documents/api.packages._packageId.documents._documentId.pages._index.get | REST API documentation (OneSpan)}
   */
  public async getPage(packageId: string, documentId: string, pageIndex: number): Promise<Responses.Response> {
    return this.api
      .get(`/api/packages${packageId}/documents/${documentId}/pages/${pageIndex}`)
      .withAcceptHeader('image/png')
      .fetch();
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
  public async getZipped(packageId: string, flatten?: boolean): Promise<Responses.Response> {
    return this.api
      .get(`/api/packages/${packageId}/documents/zip`)
      .withQueryParams({
        flatten,
      })
      .withAcceptHeader('application/zip')
      .fetch();
  }

  /**
   * Retrieves information about which recipients can view specific documents in a package during a Signing Ceremony.
   *
   * @param packageId - Package ID
   * @returns Document visibility information
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Documents/api.packages._packageId.documents.visibility.get | REST API documentation (OneSpan)}
   */
  public async getVisibilityInfo(packageId: string): Promise<DocumentVisibility> {
    const response = await this.api.get(`/api/packages/${packageId}/documents/visibility`).fetch();
    return response.json();
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
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Documents/api.packages._packageId.documents._documentId.post | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/uploading-deleting-documents | Uploading & Deleting Documents (OneSpan)}
   */
  public async update(
    packageId: string,
    documentId: string,
    payload: Partial<DocumentMetadata>,
    documentBody?: Requests.DocumentBody
  ): Promise<DocumentMetadata> {
    const request = await this.api.post(`/api/packages/${packageId}/documents/${documentId}`);

    if (!documentBody) {
      request.withBody(payload);
    } else {
      const formData = new FormData();
      formData.append('file', documentBody.body, { filename: documentBody.filename });
      formData.append('payload', JSON.stringify(payload));

      request.withBody(formData);
    }

    const response = await request.fetch();
    return response.json();
  }

  /**
   * Updates information about which recipients can view specific documents in a package during a Signing Ceremony.
   *
   * @param packageId - Package ID
   * @param payload - Updated document visibility information
   * @returns Document visibility information
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Documents/api.packages._packageId.documents.visibility.post | REST API documentation (OneSpan)}
   */
  public async updateVisibilityInfo(
    packageId: string,
    payload: RecursivePartial<DocumentVisibility>
  ): Promise<DocumentVisibility> {
    const response = await this.api.post(`/api/packages/${packageId}/documents/visibility`).withBody(payload).fetch();
    return response.json();
  }

  /**
   * Deletes the specified document.
   *
   * @param packageId - Package ID
   * @param documentId - ID of the document to be deleted
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Documents/api.packages._packageId.documents._documentId.delete | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/uploading-deleting-documents | Uploading & Deleting Documents (OneSpan)}
   */
  public async delete(packageId: string, documentId: string): Promise<void> {
    await this.api.delete(`/api/packages/${packageId}/documents/${documentId}`).fetch();
  }

  /**
   * Deletes multiple documents.
   *
   * @param packageId - Package ID
   * @param documentIds - ID of the documents to be deleted
   *
   * @remarks
   * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Documents/api.packages._packageId.documents.delete | REST API documentation (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/uploading-deleting-documents | Uploading & Deleting Documents (OneSpan)}
   */
  public async bulkDelete(packageId: string, documentIds: string[]): Promise<void> {
    await this.api.delete(`/api/packages/${packageId}/documents`).withBody(documentIds).fetch();
  }
}
