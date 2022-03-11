import { Nullable } from '../utils';
import { Address } from './address';
import { External } from './external';
import { SignatureStyle } from './signature';
import { Translation } from './translation';

/** @public */
export interface UserCustomField {
  id: string;
  name: string;
  value: Nullable<string>;
  data: Nullable<Record<string, any>>;
  translations: Nullable<Translation[]>;
}

/** @public */
export interface ProfessionalIdentityField {
  id: string;
  name: string;
  category: string;
  translations: Nullable<Translation[]>;
  type: Nullable<string>;
  value: Nullable<string>;
  data: Nullable<Record<string, any>>;
}

/** @public */
export type SpecialUserType = 'NOTARY';

/** @public */
export interface User {
  id: string;
  title: Nullable<string>;
  name: string;
  firstName: string;
  lastName: string;
  phone: Nullable<string>;
  email: string;
  company: string;
  professionalIdentityFields: ProfessionalIdentityField[];
  userCustomFields: UserCustomField[];
  address: Nullable<Address>;
  language: Nullable<string>;
  data: Nullable<Record<string, any>>;
  signature: Nullable<SignatureStyle>;
  timezoneId: string;
  external: Nullable<External>;
  created: string;
  updated: string;
  specialTypes: Nullable<SpecialUserType[]>;
}
