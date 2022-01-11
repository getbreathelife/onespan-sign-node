import { Nullable, RecursivePartial } from '../utils';
import { External } from './external';

/** @public */
export type ExtractionType = 'TEXT_TAGS' | 'ACROFIELDS';

/** @public */
export interface ExtractAnchor {
  topOffset: number;
  characterIndex: number;
  anchorPoint: string;
  index: number;
  text: string;
  width: number;
  height: number;
  leftOffset: number;
}

/** @public */
export type FieldType = 'SIGNATURE' | 'INPUT' | 'IMAGE';

/** @public */
export type FieldSubtype =
  | 'FULLNAME'
  | 'INITIALS'
  | 'CAPTURE'
  | 'LABEL'
  | 'TEXTFIELD'
  | 'TEXTAREA'
  | 'CHECKBOX'
  | 'DATE'
  | 'RADIO'
  | 'LIST'
  | 'QRCODE'
  | 'CUSTOMFIELD'
  | 'SEAL'
  | 'MOBILE_CAPTURE'
  | 'RAW_CAPTURE'
  | 'DATEPICKER';

/** @public */
export interface DocumentApproval {
  id: Nullable<string>;
  name: Nullable<string>;
  data: Nullable<Record<string, any>>;
  role: string;
  signed: Nullable<string>;
  accepted: Nullable<string>;
  fields: Nullable<DocumentField[]>;
  optional: Nullable<boolean>;
  enforceCaptureSignature: Nullable<boolean>;
}

/** @public */
export interface DocumentPage {
  id: string;
  index: number;
  version: number;
  top: Nullable<number>;
  height: Nullable<number>;
  width: Nullable<number>;
  left: Nullable<number>;
}

/** @public */
export interface FieldValidation {
  maxLength: Nullable<number>;
  pattern: Nullable<string>;
  required: Nullable<boolean>;
  errorMessage: Nullable<string>;
  errorCode: Nullable<number>;
  enum: Nullable<string[]>;
  // minLength
  minLength: Nullable<number>;
  group: Nullable<string>;
  minimumRequired: Nullable<number>;
}

/** @public */
export interface DocumentField {
  id: string;
  name: string;
  page: number;
  type: FieldType;
  subtype: FieldSubtype;
  top: Nullable<number>;
  height: Nullable<number>;
  left: Nullable<number>;
  width: Nullable<number>;
  value: Nullable<string>;
  extract: Nullable<boolean>;
  extractAnchor: Nullable<ExtractAnchor>;
  binding: Nullable<string>;
  validation: Nullable<FieldValidation>;
}

/** @public */
export interface DocumentMetadata {
  /** Document ID */
  id: string;

  /** Document name */
  name: string;

  /** Document index */
  index: number;

  /** Document data size */
  size: number;

  /** Document description */
  description: string;

  /** Document status */
  status: Nullable<string>;

  /** Document fields */
  fields: DocumentField[];

  /**
   * Enable/disable extraction on the document
   *
   * @remarks
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/document-extraction | Document Extraction (OneSpan)}
   *
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/text-tag-extraction | Text Tag Extraction (OneSpan)}
   **/
  extract: boolean;

  /**
   * Types of extraction for this document.
   *
   * @remarks
   * Values in the array are unique.
   */
  extractionTypes: ExtractionType[];

  tagged: boolean;

  /** {@inheritDoc Package.data} */
  data: Nullable<Record<string, any>>;

  approvals: DocumentApproval[];
  pages: DocumentPage[];
  external: Nullable<External>;
  signedHash: Nullable<string>;
  signerVerificationToken: Nullable<string>;
}

/**
 * Request payload for upload document operations.
 *
 * @remarks
 * Only {@link UploadDocumentRequestPayload.name | 'name'} is required.
 * See {@link https://community.onespan.com/products/onespan-sign/sandbox#/Documents/api.packages._packageId.documents.post | REST API documentation} for more information.
 *
 * @public
 */
export interface UploadDocumentRequestPayload {
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