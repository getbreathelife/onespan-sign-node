import { DocumentMetadata } from './document';
import { User } from './user';

/** @public */
export type MessageStatus = 'NEW' | 'READ' | 'TRASHED';

/**
 * @public
 */
export interface Message {
  status: MessageStatus;
  from: User;
  created: string;
  content: string;
  to: User[];
  documents: DocumentMetadata[];
}
