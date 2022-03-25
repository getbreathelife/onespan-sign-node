import { Nullable } from '../utils';
import { External } from './external';
import { CustomData } from './shared';

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
  data: Nullable<CustomData>;
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
  data: Nullable<CustomData>;

  approvals: DocumentApproval[];
  pages: DocumentPage[];
  external: Nullable<External>;
  signedHash: Nullable<string>;
  signerVerificationToken: Nullable<string>;
}

/**
 * Document visibility configuration (i.e. who can view the document).
 * @public
 */
export interface DocumentVisibilityConfiguration {
  /** Document Id */
  documentUid: Nullable<string>;

  /** List of role Ids that can view the identified document */
  roleUids: Nullable<string[]>;

  /** Configuration Id */
  id: Nullable<string>;

  /** Additional data */
  data: Nullable<CustomData>;

  /** Configuration name */
  name: Nullable<string>;
}

/**
 * Contains a list of {@link DocumentVisibilityConfiguration | document visibility configurations}.
 *
 * @remarks
 * Documents not present in the configurations are visible to all recipients. The package owner
 * can always see all documents in the package, regardless of its document visibility configuration.
 *
 * See: {@link https://community.onespan.com/products/onespan-sign/sandbox#/Documents/api.packages._packageId.documents.visibility.post | REST API documentation (OneSpan)}
 *
 * @public
 */
export interface DocumentVisibility {
  /** List of {@link DocumentVisibilityConfiguration} */
  configurations: Nullable<DocumentVisibilityConfiguration[]>;

  /** Additional data */
  data: Nullable<CustomData>;

  id: Nullable<string>;

  name: Nullable<string>;
}
