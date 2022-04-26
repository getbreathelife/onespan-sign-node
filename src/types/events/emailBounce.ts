import { DateTimeString } from '../shared';

/** @public */
export default interface EmailBounceEvent {
  readonly name: string;
  readonly sessionUser: string;
  readonly packageId: string;

  /**
   * The bounce types are the following:
   * - `BOUNCE` (a hard bounce)
   * - `COMPLAINT` (a soft bounce)
   * - `OOTO` (out-of-the-office)
   * - `UNKNOWN`
   *
   * @remarks
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/setting-callback-notifications | Setting Up Callback Notifications (OneSpan)}
   */
  readonly message: 'BOUNCE' | 'COMPLAINT' | 'OOTO' | 'UNKNOWN';

  readonly createdDate: DateTimeString;
}
