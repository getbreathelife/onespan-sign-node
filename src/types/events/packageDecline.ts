import { DateTimeString } from '../shared';

/**
 * A recipient has declined to sign a package, and has specified a reason for doing so.
 * The Originating System can use that reason to determine the next step for the package.
 *
 * @remarks
 * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/setting-callback-notifications | Setting Up Callback Notifications (OneSpan)}
 *
 * @public
 */
export default interface PackageDeclineEvent {
  readonly name: string;
  readonly sessionUser: string;
  readonly packageId: string;

  /** Reason for declining the package. */
  readonly message: string;

  readonly createdDate: DateTimeString;
}
