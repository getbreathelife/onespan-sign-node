import { DateTimeString } from '../shared';

/** @public */
export default interface DocumentSignedEvent {
  readonly name: string;
  readonly sessionUser: string;
  readonly packageId: string;
  readonly documentId: string;
  readonly createdDate: DateTimeString;
}
