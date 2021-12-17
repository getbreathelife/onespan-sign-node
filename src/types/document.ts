import { External } from './external';
import { OptionalExclude, RecursivePartial } from './utils';

type ExtractionType = 'TEXT_TAGS' | 'ACROFIELDS';

type ExtractAnchor = {
  topOffset: number;
  characterIndex: number;
  anchorPoint: string;
  index: number;
  text: string;
  width: number;
  height: number;
  leftOffset: number;
};

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

type DocumentApproval = OptionalExclude<
  {
    id: string;
    name: string;
    data: Record<string, any>;
    role: string;
    signed: string;
    accepted: string;
    fields: DocumentField[];
    optional: boolean;
    enforceCaptureSignature: boolean;
  },
  'role'
>;

type DocumentPage = OptionalExclude<
  {
    id: string;
    top: number;
    height: number;
    width: number;
    left: number;
    index: number;
    version: number;
  },
  'id' | 'index' | 'version'
>;

type FieldValidation = OptionalExclude<
  {
    maxLength: number;
    pattern: string;
    required: boolean;
    errorMessage: string;
    errorCode: number;
    enum: string[];
    minLength: number;
    group: string;
    minimumRequired: number;
  },
  'required'
>;

type DocumentField = OptionalExclude<
  {
    id: string;
    name: string;
    page: number;
    top: number;
    subtype: FieldSubtype;
    height: number;
    left: number;
    width: number;
    type: FieldType;
    value: string;
    extract: boolean;
    extractAnchor: ExtractAnchor;
    binding: string;
    validation: FieldValidation;
  },
  'extract' | 'id' | 'name' | 'page' | 'subtype' | 'type'
>;

export type DocumentMetadata = OptionalExclude<
  {
    id: string;
    name: string;
    index: number;
    size: number;
    description: string;
    status: string;
    fields: DocumentField[];
    extract: boolean;
    extractionTypes: ExtractionType[];
    tagged: boolean;
    data: Record<string, any>;
    approvals: DocumentApproval[];
    pages: DocumentPage[];
    external: External;
    signedHash: string;
    signerVerificationToken: string;
  },
  | 'approvals'
  | 'description'
  | 'extract'
  | 'extractionTypes'
  | 'fields'
  | 'id'
  | 'index'
  | 'name'
  | 'pages'
  | 'size'
  | 'tagged'
>;

// Only required field is 'name'
// https://community.onespan.com/products/onespan-sign/sandbox#/Documents/api.packages._packageId.documents.post
type UploadDocumentRequestPayloadBase = RecursivePartial<Omit<DocumentMetadata, 'extract' | 'extractionTypes'>> & {
  name: string;
};

export type UploadDocumentRequestPayload =
  | (UploadDocumentRequestPayloadBase & {
      extract: true;
      extractionTypes: ExtractionType[];
    })
  | (UploadDocumentRequestPayloadBase & { extract?: false });
