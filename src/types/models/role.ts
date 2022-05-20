import { CustomData } from '../shared';
import { Nullable } from '../utils';
import { AttachmentRequirement } from './attachment';
import { Signer } from './signer';
import { SpecialUserType } from './user';

/** @public */
export type RoleType = 'SIGNER' | 'SENDER';

/** @public */
interface BaseMessage {
  content: string;
}

/** @public */
export interface Role {
  id: string;
  index: number;
  type: RoleType;
  name: string;
  signers: Signer[];
  attachmentRequirements: AttachmentRequirement[];

  data: Nullable<CustomData>;
  emailMessage: Nullable<BaseMessage>;
  reassign: Nullable<boolean>;
  specialTypes: Nullable<SpecialUserType[]>;
}
