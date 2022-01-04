import { External } from './external';
import { Translation } from './translation';
import { Nullable } from './utils';

/**
 * @privateRemarks
 * TODO - #3: Type this
 *
 * @alpha
 */
export type Address = {};

/**
 * @privateRemarks
 * TODO - #3: Type this
 *
 * @alpha
 */
export type SignatureStyle = {};

/** @public */
export interface UserCustomField {
  id: string;
  name: string;
  value: Nullable<string>;
  data: Nullable<Record<string, any>>;
  translations: Nullable<Translation[]>;
}

/**
 * @privateRemarks
 * TODO - #3: Type this
 *
 * @alpha
 **/
export type ProfessionalIdentityField = {};

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
