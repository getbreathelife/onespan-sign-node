import { CustomData } from '../shared';
import { Nullable } from '../utils';

/** @public */
export interface AttachmentRequirement {
  id: string;
  name: string;
  required: boolean;
  status: 'INCOMPLETE' | 'REJECTED' | 'COMPLETE';

  description: Nullable<string>;
  comment: Nullable<string>;
  data: Nullable<CustomData>;
}
