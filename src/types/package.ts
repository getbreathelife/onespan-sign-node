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
 * Request payload for package creation/replacement operations.
 *
 * @privateRemarks
 * TODO: support uploading documents during package creation
 *
 * @remarks
 * Request payload should at least contain {@link PackageRequestPayload.name | 'name'} property.
 *
 * See {@link https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages.post | REST API documentation}
 * for more information.
 *
 * @public
 */
export interface PackageRequestPayload {
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

/**
 * Request parameters for the get all packages operation.
 *
 * @remarks
 * See {@link https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages.get | REST API documentation (OneSpan)}
 *
 * @public
 */
export interface GetAllPackagesRequestParameters {
  /** The folder to search for. If not set, it will search in all folders except trashed. */
  query?: 'drafts' | 'inbox' | 'trashed';

  /** If a template is needed, set to `TEMPLATE` */
  type?: 'TEMPLATE';

  /**
   * Any text which is going to be used in conjunction with the
   * {@link GetAllPackagesRequestParameters.searchtype | searchtype} if provided.
   */
  search?: string;

  /**
   * When empty, a wildcard search will be done in the package name and description
   * for the search value, otherwise the allowable values will make more restrictive searches.
   */
  searchtype?: 'exact' | 'exactname';

  /** Filter the search result, by package status. */
  predefined?: 'all' | 'awaitingSignature' | 'sent' | 'completed' | 'expiringSoon';

  /** The visibility used to search for the template. ONLY used for templates. */
  visibility?: PackageVisibility;

  /** The date after which packages need to have been last updated in order to be retrieved. */
  lastUpdatedStartDate?: Date | string;

  /** The date before which packages need to have been last updated in order to be retrieved. */
  lastUpdatedEndDate?: Date | string;

  /** The first record that will be returned. Useful for pagination. */
  from?: number;

  /** The last record that will be returned. Useful for pagination. */
  to?: number;

  /** The field according to which the data will be sorted. */
  sort?: 'created' | 'completed' | 'updated' | 'due' | 'name' | 'status';

  /** The direction according to which the data will be sorted. 'asc' for ascending and 'desc' for descending. */
  dir?: 'asc' | 'desc';

  /** Currently, "id" is the only available value. This means that only ID will be returned in each array node. */
  fields?: 'id';

  /** The transaction owner's ID. Indicate the target user to search on. */
  ownerUserId?: string;

  /** The transaction owner's email address. Indicate the target user to search on. */
  ownerEmail?: string;
}
