import { External } from './external';
import { Nullable, RecursivePartial } from './utils';

type ExtractionType = 'TEXT_TAGS' | 'ACROFIELDS';

interface ExtractAnchor {
  topOffset: number;
  characterIndex: number;
  anchorPoint: string;
  index: number;
  text: string;
  width: number;
  height: number;
  leftOffset: number;
}

type FieldType = 'SIGNATURE' | 'INPUT' | 'IMAGE';

type FieldSubtype =
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

interface DocumentApproval {
  id: string | null;
  name: string | null;
  data: Record<string, any> | null;
  role: string;
  signed: string | null;
  accepted: string | null;
  fields: DocumentField[] | null;
  optional: boolean | null;
  enforceCaptureSignature: boolean | null;
}

interface DocumentPage {
  id: string;
  index: number;
  version: number;
  top: number | null;
  height: number | null;
  width: number | null;
  left: number | null;
}

interface FieldValidation {
  maxLength: number | null;
  pattern: string | null;
  required: boolean | null;
  errorMessage: string | null;
  errorCode: number | null;
  enum: string[] | null;
  // minLength
  minLength: number | null;
  group: string | null;
  minimumRequired: number | null;
}

interface DocumentField {
  id: string;
  name: string;
  page: number;
  type: FieldType;
  subtype: FieldSubtype;
  top?: number;
  height?: number;
  left?: number;
  width?: number;
  value?: string;
  extract?: boolean;
  extractAnchor?: ExtractAnchor;
  binding: Nullable<string>;
  validation?: FieldValidation;
}

/** @public */
export interface DocumentMetadata {
  /** Document ID */
  id: string;

  /** Document name */
  name: string;

  index: number;

  size: number;

  /** Document description */
  description: string;

  /** Document status */
  status: Nullable<string>;

  fields: DocumentField[];
  extract: boolean;
  extractionTypes: ExtractionType[];
  tagged: boolean;
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
  name: string;
  index?: number;
  size?: number;
  description?: string;
  status?: string;
  fields?: RecursivePartial<DocumentField>[];
  extract?: boolean;
  extractionTypes?: ExtractionType[];
  tagged?: boolean;
  data?: Record<string, any>;
  approvals?: RecursivePartial<DocumentApproval>[];
  pages?: RecursivePartial<DocumentPage>[];
  external?: Partial<External>;
  signedHash?: string;
  signerVerificationToken?: string;
}
