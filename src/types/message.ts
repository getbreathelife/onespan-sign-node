import { DocumentMetadata } from './document';
import { User } from './user';
import { OptionalExclude } from './utils';

type MessageStatus = 'NEW' | 'READ' | 'TRASHED';

export type Message = OptionalExclude<
  {
    status: MessageStatus;
    from: User;
    created: string;
    content: string;
    to: User[];
    documents: DocumentMetadata[];
  },
  'content' | 'created' | 'documents' | 'from' | 'status' | 'to'
>;
