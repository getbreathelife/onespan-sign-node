import { DateTimeString } from '../shared';

/** @public */
export default interface PackageExpireEvent {
  readonly name: string;
  readonly sessionUser: string;
  readonly packageId: string;
  readonly createdDate: DateTimeString;
}
