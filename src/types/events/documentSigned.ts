import { DateTimeString } from '../shared';

/** @public */
export interface DocumentSignedEvent {
  name: 'DOCUMENT_SIGNED';
  sessionUser: string;
  packageId: string;
  documentId: string;
  createdDate: DateTimeString;
}
