import { Nullable } from '../utils';
import { DateTimeString, TimeZoneId } from './shared';

export interface CustomField {}

export interface AccountProvider {}

export interface License {}

export interface Company {}

/** @public */
export interface Account {
  id: string;
  name: string;
  owner: string;
  customFields: CustomField[];
  timezoneId: TimeZoneId;
  licenses: License[];
  company: Company;

  providers: Nullable<AccountProvider[]>;
  data: Nullable<Record<string, any>>;
  logoUrl: Nullable<string>;
  logoAltTextKey: Nullable<string>;

  /** Date and time when the account is created. */
  created: DateTimeString;

  /** Date and time when the account is updated. */
  updated: DateTimeString;
}
