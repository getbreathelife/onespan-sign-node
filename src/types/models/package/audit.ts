import { Nullable } from '../../utils';

/** @public */
export type AuditEventTargetType =
  | 'Document'
  | 'Package'
  | 'AuthMethod'
  | 'Account'
  | 'CHALLENGE'
  | 'SMS'
  | 'SSO'
  | 'EMAIL_LINK'
  | 'Knowledge Based Authentication';

/** @public */
export type AuditEventType =
  | 'Accept'
  | 'Click To Sign'
  | 'Click To Initial'
  | 'Capture Signature'
  | 'Confirm'
  | 'Download'
  | 'Download Zip'
  | 'Form Field'
  | 'Login'
  | 'View'
  | 'Opt Out'
  | 'Signing Session For Recipient'
  | 'Decline';

/** @public */
export interface AuditEvent {
  /** The target type. */
  'target-type': Nullable<AuditEventTargetType>;

  /** The time the event happened. */
  'date-time': Nullable<string>;

  /** The audit type. */
  type: Nullable<AuditEventType>;

  /** The audit target. */
  target: Nullable<string>;

  /** The signer's full name. */
  user: Nullable<string>;

  /** The signer's email. */
  'user-email': Nullable<string>;

  /** The signer's IP address. */
  'user-ip': Nullable<string>;

  /** The data signer entered. */
  data: Nullable<string>;
}

/** @public */
export interface ExportedAuditTrail {
  /** The package id. */
  'package-id': Nullable<string>;

  /** Audit events */
  'audit-events': Nullable<AuditEvent[]>;
}
