import { Readable } from 'node:stream';

import { DocumentApproval, DocumentField, DocumentPage, External, ExtractionType } from '../models';
import { RecursivePartial } from '../utils';

/**
 * Data and filename of a document for resource creation/update purpose
 * @public
 */
export interface DocumentBody {
  /** Data of the document */
  body: Buffer | Readable;

  /** Filename of the document */
  filename: string;
}

/**
 * Request payload for create document operations.
 *
 * @remarks
 * Only {@link name | 'name'} is required.
 * See {@link https://community.onespan.com/products/onespan-sign/sandbox#/Documents/api.packages._packageId.documents.post | REST API documentation} for more information.
 *
 * @public
 */
export interface CreateDocumentData {
  /** {@inheritDoc DocumentMetadata.id} */
  id?: string;

  /** {@inheritDoc DocumentMetadata.name} */
  name: string;

  /** {@inheritDoc DocumentMetadata.index} */
  index?: number;

  /** {@inheritDoc DocumentMetadata.size} */
  size?: number;

  /** {@inheritDoc DocumentMetadata.description} */
  description?: string;

  /** {@inheritDoc DocumentMetadata.status} */
  status?: string;

  /** {@inheritDoc DocumentMetadata.fields} */
  fields?: RecursivePartial<DocumentField>[];

  /** {@inheritDoc DocumentMetadata.extract} */
  extract?: boolean;

  /** {@inheritDoc DocumentMetadata.extractionTypes} */
  extractionTypes?: ExtractionType[];

  /** {@inheritDoc DocumentMetadata.tagged} */
  tagged?: boolean;

  /** {@inheritDoc DocumentMetadata.data} */
  data?: Record<string, any>;

  /** {@inheritDoc DocumentMetadata.approvals} */
  approvals?: RecursivePartial<DocumentApproval>[];

  /** {@inheritDoc DocumentMetadata.pages} */
  pages?: RecursivePartial<DocumentPage>[];

  /** {@inheritDoc DocumentMetadata.external} */
  external?: Partial<External>;

  /** {@inheritDoc DocumentMetadata.signedHash} */
  signedHash?: string;

  /** {@inheritDoc DocumentMetadata.signerVerificationToken} */
  signerVerificationToken?: string;
}

/**
 * Request payload for each entry in the bulk create document operations.
 *
 * @remarks
 * Only {@link name | 'name'} is required.
 * See:
 * - {@link https://community.onespan.com/products/onespan-sign/sandbox#/Documents/api.packages._packageId.documents.post | REST API documentation}
 *
 * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/uploading-deleting-documents | Uploading & Deleting Documents} (Uploading Multiple Documents)
 *
 * @public
 */
export interface BulkCreateDocumentData {
  /** {@inheritDoc DocumentMetadata.id} */
  id?: string;

  /** {@inheritDoc DocumentMetadata.name} */
  name: string;

  /** {@inheritDoc DocumentMetadata.index} */
  index?: number;

  /** {@inheritDoc DocumentMetadata.size} */
  size?: number;

  /** {@inheritDoc DocumentMetadata.description} */
  description?: string;

  /** {@inheritDoc DocumentMetadata.status} */
  status?: string;

  /** {@inheritDoc DocumentMetadata.fields} */
  fields?: RecursivePartial<DocumentField>[];

  /** {@inheritDoc DocumentMetadata.extract} */
  extract?: boolean;

  /** {@inheritDoc DocumentMetadata.extractionTypes} */
  extractionTypes?: ExtractionType[];

  /** {@inheritDoc DocumentMetadata.tagged} */
  tagged?: boolean;

  /** {@inheritDoc DocumentMetadata.data} */
  data?: Record<string, any>;

  /** {@inheritDoc DocumentMetadata.approvals} */
  approvals?: RecursivePartial<DocumentApproval>[];

  /** {@inheritDoc DocumentMetadata.pages} */
  pages?: RecursivePartial<DocumentPage>[];

  /** {@inheritDoc DocumentMetadata.external} */
  external?: Partial<External>;

  /** {@inheritDoc DocumentMetadata.signedHash} */
  signedHash?: string;

  /** {@inheritDoc DocumentMetadata.signerVerificationToken} */
  signerVerificationToken?: string;

  /** Data and filename of the document */
  documentBody: DocumentBody;
}

/** @public */
export type GetDocumentBodyOption = { format: 'original' } | { format: 'pdf'; flatten?: boolean };
