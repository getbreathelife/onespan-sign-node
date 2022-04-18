import { DateTimeString } from '../shared';

/**
 * A package has completed the signing process.
 *
 * If there are multiple signers then the `sessionUser` field will be the signer ID of the last signer to sign.
 *
 * @remarks
 * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/setting-callback-notifications | Setting Up Callback Notifications (OneSpan)}
 *
 * @public
 */
export default interface PackageCompleteEvent {
  readonly name: string;
  readonly sessionUser: string;
  readonly packageId: string;
  readonly createdDate: DateTimeString;
}
