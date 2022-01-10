import { Nullable } from '../utils';
import { DocumentMetadata } from './document';
import { Message } from './message';
import { Role, Sender } from './role';

/** @public */
export type PackageType = 'PACKAGE' | 'TEMPLATE' | 'LAYOUT';

/** @public */
export type PackageStatus = 'DRAFT' | 'SENT' | 'COMPLETED' | 'EXPIRED' | 'DECLINED' | 'OPTED_OUT' | 'ARCHIVED';

/** @public */
export type PackageVisibility = 'ACCOUNT' | 'SENDER';

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

/**
 * @privateRemarks
 * TODO - #3: Type all properties of `ceremony`
 *
 * @alpha
 */
export interface PackageSettings {
  ceremony: {
    handOver: {
      title: string | undefined;
      href: string | undefined;
      text: string | undefined;
    };
    declineButton?: boolean;
    hideCaptureText?: boolean;
    hideWatermark?: boolean;
  };
}

/**
 * @privateRemarks
 * TODO - #3: Type these
 * @alpha
 */
export interface PackageArtifactsLimits {}
/** @alpha */
export interface SignedDocumentDelivery {}

/**
 * @public
 */
export interface Package {
  id: string;
  name: string;
  roles: Role[];
  status: PackageStatus;
  messages: Message[];
  description: string;

  /**
   * Custom data that is passed through.
   *
   * @remarks
   * See {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/custom-transaction-data | Custom Transaction Data (OneSpan)}
   */
  data: Nullable<Record<string, any>>;

  language: Nullable<string>;
  autocomplete: boolean;
  type: PackageType;
  due: Nullable<string>;
  visibility: PackageVisibility;
  settings: Nullable<PackageSettings>;
  consent: Nullable<string>;
  notaryRoleId: Nullable<string>;
  trashed: boolean;
  notarized: boolean;
  timezoneId: Nullable<string>;
  documents: DocumentMetadata[];
  emailMessage: string;
  created: string;
  updated: string;
  completed: Nullable<string>;
  sender: Nullable<Sender>;
  limits: Nullable<PackageArtifactsLimits>;
  signedDocumentDelivery: Nullable<SignedDocumentDelivery>;
  bulkSendable: Nullable<boolean>;
}

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

export interface ExportedAuditTrail {
  /** The package id. */
  'package-id': Nullable<string>;

  /** Audit events */
  'audit-events': Nullable<AuditEvent[]>;
}
