import { CustomData, DateTimeString, TimeZoneId } from '../shared';
import { Nullable } from '../utils';
import { Address } from './address';
import { Auth, KnowledgeBasedAuthentication } from './auth';
import { External } from './external';
import { Group } from './group';
import { SignatureStyle } from './signature';
import { ProfessionalIdentityField, SpecialUserType, UserCustomField } from './user';

/** @public */
export type SignerType = 'ACCOUNT_SENDER' | 'EXTERNAL_SENDER' | 'EXTERNAL_SIGNER' | 'GROUP_SIGNER';

/** @public */
export interface Delivery {
  download: boolean;
  email: boolean;
  provider: boolean;
}

/** @public */
export interface Signer {
  id: string;
  auth: Auth;
  company: string;
  delivery: Delivery;
  userCustomFields: UserCustomField[];
  professionalIdentityFields: ProfessionalIdentityField[];
  firstName: string;
  lastName: string;
  email: string;
  knowledgeBasedAuthentication: KnowledgeBasedAuthentication.default;
  signerType: SignerType;
  timezoneId: TimeZoneId;
  created: DateTimeString;
  updated: DateTimeString;

  name: Nullable<string>;
  signature: Nullable<SignatureStyle>;
  address: Nullable<Address>;
  data: Nullable<CustomData>;
  group: Nullable<Group>;
  language: Nullable<string>;
  external: Nullable<External>;
  phone: Nullable<string>;
  title: Nullable<string>;
  specialTypes: Nullable<SpecialUserType[]>;
}
