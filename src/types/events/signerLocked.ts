import { DateTimeString } from '../shared';

/**
 * A callback notification indicates that a signer has been locked out due to repeated SMS/Q&A authentication failures.
 *
 * @remarks
 * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/setting-callback-notifications | Setting Up Callback Notifications (OneSpan)}
 *
 * @public
 */
export default interface SignerLockedEvent {
  readonly name: string;
  readonly sessionUser: string;
  readonly packageId: string;
  readonly createdDate: DateTimeString;
}
