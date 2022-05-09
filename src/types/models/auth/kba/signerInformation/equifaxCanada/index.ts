import { DateTimeString } from '../../../../../shared';
import { Nullable } from '../../../../../utils';

/** @public */
export default interface SignerInformationForEquifaxCanada {
  streetAddress: string;
  city: string;
  province: string;
  postalCode: string;
  firstName: string;
  lastName: string;
  timeAtAddress: Nullable<number>;
  homePhoneNumber: Nullable<string>;
  driversLicenseNumber: Nullable<string>;
  dateOfBirth: Nullable<DateTimeString>;
  socialInsuranceNumber: Nullable<string>;
}
