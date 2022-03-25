import { Nullable } from '../utils';

/** @public */
export interface Address {
  state: Nullable<string>;
  country: Nullable<string>;
  city: Nullable<string>;
  zipCode: Nullable<string>;

  /** Address line 1 */
  address1: Nullable<string>;

  /** Address line 2 */
  address2: Nullable<string>;
}
