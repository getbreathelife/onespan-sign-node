import { DateTimeString } from '../shared';

/**
 * Indicates that a signer has uploaded an attachment.
 * @public
 */
export default interface PackageAttachmentEvent {
  readonly name: string;
  readonly sessionUser: string;
  readonly packageId: string;

  /** Name of the attachment */
  readonly message: string;

  readonly createdDate: DateTimeString;
}
