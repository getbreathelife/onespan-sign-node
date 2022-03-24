import { Nullable } from '../utils';
import { CustomData } from './shared';

/** @public */
export interface External {
  id: string;
  provider: string;
  providerName: Nullable<string>;
  data: Nullable<CustomData>;
}
