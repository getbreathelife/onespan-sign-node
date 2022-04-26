import { DateTimeString } from '../shared';

/**
 * A package has been marked as `DO_NOT_AUTOCOMPLETE`. An action by the sender
 * will be required to complete the package.
 *
 * @remarks
 * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/setting-callback-notifications | Setting Up Callback Notifications (OneSpan)}
 *
 * @public
 */
export default interface PackageReadyForCompleteEvent {
  readonly name: string;
  readonly sessionUser: string;
  readonly packageId: string;
  readonly createdDate: DateTimeString;
}
