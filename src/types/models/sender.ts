import { Nullable } from '../utils';
import { Account } from './account';
import { Address } from './address';
import { External } from './external';
import { GroupMembership } from './group';
import { SignatureStyle } from './signature';
import { ProfessionalIdentityField, SpecialUserType, UserCustomField } from './user';

/** @public */
export type SenderType = 'REGULAR' | 'MANAGER';

/** @public */
export type SenderStatus = 'INVITED' | 'ACTIVE' | 'LOCKED';

/**
 * @public
 */
export interface Sender {
  id: string;
  name: string;
  type: SenderType;
  signature: Nullable<SignatureStyle>;
  status: SenderStatus;
  account: Nullable<Account>;
  address: Nullable<Address>;
  language: Nullable<string>;
  data: Nullable<Record<string, any>>;

  /**
   * Timezone IDs as defined in the {@link https://www.iana.org/time-zones | Time Zone Database}.
   *
   * @remarks
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/configuring-time-zones | Configuring time zones}
   *
   * - {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones | List of tz database time zones (Wikipedia)}
   */
  timezoneId: string;

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

  /**
   * Date and time when the sender is created.
   *
   * @remarks
   * Uses date-time notation as defined by {@link https://datatracker.ietf.org/doc/html/rfc3339#section-5.6 | RFC 3339, section 5.6}
   */
  created: string;

  /**
   * Date and time when the sender is updated.
   *
   * @remarks
   * Uses date-time notation as defined by {@link https://datatracker.ietf.org/doc/html/rfc3339#section-5.6 | RFC 3339, section 5.6}
   */
  updated: string;

  /**
   * Date and time when the sender is locked.
   *
   * @remarks
   * Uses date-time notation as defined by {@link https://datatracker.ietf.org/doc/html/rfc3339#section-5.6 | RFC 3339, section 5.6}
   */
  locked: Nullable<string>;

  /**
   * Date and time when the sender is activated.
   *
   * @remarks
   * Uses date-time notation as defined by {@link https://datatracker.ietf.org/doc/html/rfc3339#section-5.6 | RFC 3339, section 5.6}
   */
  activated: Nullable<string>;
}
