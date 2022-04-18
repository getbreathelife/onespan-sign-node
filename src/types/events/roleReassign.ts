import { DateTimeString } from '../shared';

/** @public */
export default interface RoleReassignEvent {
  readonly name: string;
  readonly sessionUser: string;
  readonly packageId: string;
  readonly newRoleId: string;
  readonly createdDate: DateTimeString;
}
