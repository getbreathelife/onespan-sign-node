import { DocumentApproval, DocumentField, DocumentPage, External, ExtractionType } from '../models';
import { RecursivePartial } from '../utils';

/**
 * Request payload for create/update document operations.
 *
 * @remarks
 * Only {@link DocumentData.name | 'name'} is required.
 * See {@link https://community.onespan.com/products/onespan-sign/sandbox#/Documents/api.packages._packageId.documents.post | REST API documentation} for more information.
 *
 * @public
 */
export interface DocumentData {
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
 * {@inheritDoc DocumentData}
 * @public
 */
export type CreateDocumentData = DocumentData;
