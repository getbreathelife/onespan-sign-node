import { DateTimeString } from '../../../../../shared';
import { Nullable } from '../../../../../utils';

/** @public */
export default interface SignerInformationForEquifaxUSA {
  state: string;
  streetAddress: string;
  city: string;
  zip: string;
  firstName: string;
  lastName: string;
  valid: Nullable<boolean>;
  timeAtAddress: Nullable<number>;
  homePhoneNumber: Nullable<string>;
  driversLicenseNumber: Nullable<string>;
  dateOfBirth: Nullable<DateTimeString>;
  socialSecurityNumber: Nullable<string>;
}
