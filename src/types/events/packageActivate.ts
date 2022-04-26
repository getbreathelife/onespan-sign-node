import { DateTimeString } from '../shared';

/**
 * A package was moved from the status `DRAFT` or `DELETED` to the status `SENT`.
 * By default, a package is created in the `DRAFT` state, and is moved to the `SENT`
 * state when it's ready to be processed by signers.
 *
 * @remarks
 * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/setting-callback-notifications | Setting Up Callback Notifications (OneSpan)}
 *
 * @public
 **/
export default interface PackageActivateEvent {
  readonly name: string;
  readonly sessionUser: string;
  readonly packageId: string;
  readonly createdDate: DateTimeString;
}
