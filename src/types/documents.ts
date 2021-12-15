export enum OneSpanExtractionTypes {
  TEXT_TAGS = 'TEXT_TAGS',
  ACROFIELDS = 'ACROFIELDS',
}

type OneSpanDocumentBase = {
  id: string;
  name: string;
  description?: string;
};

export type OneSpanDocument =
  | (OneSpanDocumentBase & {
      extract: true;
      extractionTypes: OneSpanExtractionTypes[];
    })
  | (OneSpanDocumentBase & { extract?: false });
