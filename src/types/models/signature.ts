import { Nullable } from '../utils';

/** @public */
export interface TextualSignatureStyle {
  color: Nullable<string>;
  font: Nullable<string>;
}

/** @public */
export interface SignatureStyle {
  handdrawn: Nullable<string>;
  textual: Nullable<TextualSignatureStyle>;
}
