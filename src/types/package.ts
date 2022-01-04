import { DocumentMetadata } from './document';
import { Message } from './message';
import { Role, Sender } from './role';
import { Nullable } from './utils';

/** @public */
export type PackageType = 'PACKAGE' | 'TEMPLATE' | 'LAYOUT';

/** @public */
export type PackageStatus = 'DRAFT' | 'SENT' | 'COMPLETED' | 'EXPIRED' | 'DECLINED' | 'OPTED_OUT' | 'ARCHIVED';

/** @public */
export type PackageVisibility = 'ACCOUNT' | 'SENDER';

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

/**
 * Request payload for package creation operations.
 *
 * @privateRemarks
 * TODO: support uploading documents during package creation
 *
 * @remarks
 * Request payload should at least contain {@link CreatePackageRequestPayload.name | 'name'} property.
 * See {@link https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages.post | REST API documentation} for more information.
 *
 * @public
 */
export interface CreatePackageRequestPayload {
  id?: string;
  name: string;
  roles?: Role[];
  status?: PackageStatus;
  messages?: Message[];
  data?: Record<string, any>;
  description?: string;
  language?: string;
  autocomplete?: boolean;
  type?: PackageType;
  due?: string;
  visibility?: PackageVisibility;
  settings?: PackageSettings;
  consent?: string;
  notaryRoleId?: string;
  trashed?: boolean;
  notarized?: boolean;
  timezoneId?: string;
  documents?: DocumentMetadata[];
  emailMessage?: string;
  created?: string;
  updated?: string;
  completed?: string;
  sender?: Sender;
  limits?: PackageArtifactsLimits;
  signedDocumentDelivery?: SignedDocumentDelivery;
  bulkSendable?: boolean;
}

/** @public */
export interface CreatePackageResponsePayload {
  id: string;
}
