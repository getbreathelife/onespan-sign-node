import { CustomData, DateTimeString, TimeZoneId } from '../shared';
import { Nullable } from '../utils';
import Account from './account';
import { Address } from './address';
import { External } from './external';
import { GroupMembership } from './group';
import { SignatureStyle } from './signature';
import { ProfessionalIdentityField, SpecialUserType, UserCustomField } from './user';

/** @public */
export type SenderType = 'REGULAR' | 'MANAGER';

/** @public */
export type SenderStatus = 'INVITED' | 'ACTIVE' | 'LOCKED';

/** @public */
export interface Sender {
  id: string;
  name: string;
  type: SenderType;
  signature: Nullable<SignatureStyle>;
  status: SenderStatus;
  account: Nullable<Account>;
  address: Nullable<Address>;
  language: Nullable<string>;
  data: Nullable<CustomData>;
  timezoneId: TimeZoneId;
  external: Nullable<External>;
  company: string;
  phone: Nullable<string>;
  userCustomFields: UserCustomField[];
  professionalIdentityFields: ProfessionalIdentityField[];
  title: Nullable<string>;
  firstName: string;
  lastName: string;
  email: string;
  memberships: GroupMembership[];
  specialTypes: SpecialUserType[];
  hasDelegates: boolean;

  /** Date and time when the sender is created. */
  created: DateTimeString;

  /** Date and time when the sender is updated. */
  updated: DateTimeString;

  /** Date and time when the sender is locked. */
  locked: Nullable<DateTimeString>;

  /** Date and time when the sender is activated. */
  activated: Nullable<DateTimeString>;
}
