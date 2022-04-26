import { DateTimeString } from '../shared';

/**
 * A package was trashed, but is being moved back to the state it was in before it was trashed.
 *
 * @remarks
 * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/setting-callback-notifications | Setting Up Callback Notifications (OneSpan)}
 *
 * @public
 */
export default interface PackageRestoreEvent {
  readonly name: string;
  readonly sessionUser: string;
  readonly packageId: string;
  readonly createdDate: DateTimeString;
}
