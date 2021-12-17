import { External } from './external';
import { Translation } from './translation';
import { OptionalExclude } from './utils';

// TODO - #3: Type this
type Address = {};

// TODO - #3: Type this
type SignatureStyle = {};

type UserCustomField = OptionalExclude<
  {
    value: string;
    name: string;
    id: string;
    data: Record<string, any>;
    translations: Translation[];
  },
  'id' | 'name'
>;

// TODO - #3: Type this
type ProfessionalIdentityField = {};

type SpecialUserType = 'NOTARY';

export type User = OptionalExclude<
  {
    address: Address;
    language: string;
    name: string;
    signature: SignatureStyle;
    created: string;
    id: string;
    data: Record<string, any>;
    title: string;
    userCustomFields: UserCustomField[];
    timezoneId: string;
    external: External;
    professionalIdentityFields: ProfessionalIdentityField[];
    company: string;
    updated: string;
    phone: string;
    specialTypes: SpecialUserType[];
    firstName: string;
    lastName: string;
    email: string;
  },
  | 'company'
  | 'created'
  | 'email'
  | 'firstName'
  | 'id'
  | 'lastName'
  | 'name'
  | 'professionalIdentityFields'
  | 'timezoneId'
  | 'updated'
  | 'userCustomFields'
>;
