type ExtractionType = 'TEXT_TAGS' | 'ACROFIELDS';

type FieldType = 'SIGNATURE' | 'INPUT';

type FieldSubtype =
  | 'FULLNAME'
  | 'INITIALS'
  | 'CAPTURE'
  | 'MOBILE_CAPTURE'
  | 'LABEL'
  | 'TEXTFIELD'
  | 'TEXTAREA'
  | 'CHECKBOX'
  | 'DATE'
  | 'RADIO'
  | 'LIST';

type DocumentApproval = {
  id: string;
  role: string;
  data: null;
  signed: null;
  accepted: null;
  fields: [];
  name: '';
};

type DocumentPage = {
  id: string;
  top: number;
  height: number;
  width: number;
  left: number;
  index: number;
  version: number;
};

type DocumentField = {
  page: number;
  top: number;
  subtype: FieldSubtype;
  height: number;
  left: number;
  width: number;
  id: string;
  type: FieldType;
  value: string;
};

export type DocumentMetadata = {
  id: string;
  name: string;
  index: number;
  size: number;
  description: string;
  status: string;
  fields: DocumentField[];
  extract: false;
  data: {
    ese_document_texttag_extract_needed: boolean;
  };
  approvals: DocumentApproval[];
  pages: DocumentPage[];
  external: null;
  signedHash: null;
  signerVerificationToken: null;
};

type UploadDocumentRequestPayloadBase = {
  id: string;
  name: string;
  description?: string;
};

export type UploadDocumentRequestPayload =
  | (UploadDocumentRequestPayloadBase & {
      extract: true;
      extractionTypes: ExtractionType[];
    })
  | (UploadDocumentRequestPayloadBase & { extract?: false });
