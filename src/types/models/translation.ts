import { CustomData } from '../shared';
import { Nullable } from '../utils';

/** @public */
export interface Translation {
  language: string;
  id: Nullable<string>;
  name: Nullable<string>;
  description: Nullable<string>;
  data: Nullable<CustomData>;
}
