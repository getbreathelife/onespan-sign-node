import { CustomData } from '../shared';
import { Nullable } from '../utils';

/** @public */
export interface External {
  id: string;
  provider: string;
  providerName: Nullable<string>;
  data: Nullable<CustomData>;
}
