import { Nullable } from '../utils';
import { CustomData } from './shared';

/** @public */
export interface Translation {
  language: string;
  id: Nullable<string>;
  name: Nullable<string>;
  description: Nullable<string>;
  data: CustomData;
}
