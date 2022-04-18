import { DateTimeString } from '../shared';

/**
 * KBA Authentication (Knowledge-Based Authentication) failure event.
 * @public
 */
export default interface KbaFailureEvent {
  readonly name: string;
  readonly sessionUser: string;
  readonly packageId: string;
  readonly createdDate: DateTimeString;
}
