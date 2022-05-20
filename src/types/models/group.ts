import { CustomData, DateTimeString } from '../shared';
import { Nullable } from '../utils';
import Account from './account';

/** @public */
export type GroupMemberType = 'REGULAR' | 'MANAGER';

/** @public */
export interface GroupMembership {
  groupId: string;
  groupName: string;
  memberType: GroupMemberType;
}

/** @public */
export interface GroupMember {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  memberType: GroupMemberType;
  pending: boolean;
}

/** @public */
export interface Group {
  id: string;
  name: string;
  members: GroupMember[];
  emailMembers: boolean;
  reciprocalDelegation: boolean;
  created: DateTimeString;
  updated: DateTimeString;

  account: Nullable<Account>;
  data: Nullable<CustomData>;
  email: Nullable<string>;
}
