import { CustomData, DateTimeString, TimeZoneId } from '../../shared';
import { Nullable } from '../../utils';
import { Address } from '../address';
import { Translation } from '../translation';
import * as License from './license';

/** @public */
interface CustomField {
  id: string;
  name: string;
  required: boolean;
  translations: Translation[];
  value: Nullable<string>;
  data: Nullable<CustomData>;
}

/** @public */
interface Provider {
  id: string;
  name: string;
  provides: string;
  data: Nullable<CustomData>;
}

/** @public */
interface Providers {
  documents: Provider[];
  users: Provider[];
}

/** @public */
interface Company {
  id: string;
  name: string;
  address: Nullable<Address>;
  data: Nullable<CustomData>;
}

/** @public */
interface Account {
  id: string;
  name: string;
  owner: string;
  customFields: CustomField[];
  timezoneId: TimeZoneId;
  licenses: License.default[];
  company: Company;

  providers: Nullable<Providers>;
  data: Nullable<CustomData>;
  logoUrl: Nullable<string>;
  logoAltTextKey: Nullable<string>;

  /** Date and time when the account is created. */
  created: DateTimeString;

  /** Date and time when the account is updated. */
  updated: DateTimeString;
}

export { Account as default, License, CustomField, Provider, Providers, Company };
