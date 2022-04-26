/** @public */
import { Nullable } from '../utils';

export type CallbackEvent =
  | 'DOCUMENT_SIGNED'
  | 'EMAIL_BOUNCE'
  | 'KBA_FAILURE'
  | 'PACKAGE_ACTIVATE'
  | 'PACKAGE_ARCHIVE'
  | 'PACKAGE_ATTACHMENT'
  | 'PACKAGE_COMPLETE'
  | 'PACKAGE_CREATE'
  | 'PACKAGE_DEACTIVATE'
  | 'PACKAGE_DECLINE'
  | 'PACKAGE_DELETE'
  | 'PACKAGE_EXPIRE'
  | 'PACKAGE_OPT_OUT'
  | 'PACKAGE_READY_FOR_COMPLETE'
  | 'PACKAGE_RESTORE'
  | 'PACKAGE_TRASH'
  | 'ROLE_REASSIGN'
  | 'SIGNER_COMPLETE'
  | 'SIGNER_LOCKED'
  | 'TEMPLATE_CREATE';

/** @public */
export interface Callback {
  events: Nullable<CallbackEvent[]>;
  /** Callback URL for the events */
  url: Nullable<string>;
  /** Unique callback key */
  key: Nullable<string>;
}
