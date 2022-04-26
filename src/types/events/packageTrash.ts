import { DateTimeString } from '../shared';

/** @public */
export default interface PackageTrashEvent {
  readonly name: string;
  readonly sessionUser: string;
  readonly packageId: string;
  readonly createdDate: DateTimeString;
}
