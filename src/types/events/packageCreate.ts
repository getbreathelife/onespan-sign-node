import { DateTimeString } from '../shared';

/** @public */
export default interface PackageCreateEvent {
  readonly name: string;
  readonly sessionUser: string;
  readonly packageId: string;
  readonly createdDate: DateTimeString;
}
