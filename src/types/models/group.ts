/** @public */
export interface GroupMembership {
  groupId: string;
  groupName: string;
  memberType: 'REGULAR' | 'MANAGER';
}
