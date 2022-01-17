import {
  DocumentMetadata,
  Message,
  PackageArtifactsLimits,
  PackageSettings,
  PackageStatus,
  PackageType,
  PackageVisibility,
  Role,
  Sender,
  SignedDocumentDelivery,
} from '../models';

/**
 * Request parameters for the get all packages operation. The parameters will be appended
 * to the URL when the API request is made.
 *
 * @remarks
 * See {@link https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages.get | REST API documentation (OneSpan)}
 *
 * @public
 */
export interface GetAllPackagesParameters {
  /** The folder to search for. If not set, it will search in all folders except trashed. */
  query?: 'drafts' | 'inbox' | 'trashed';

  /** If a template is needed, set to `TEMPLATE` */
  type?: 'TEMPLATE';

  /**
   * Any text which is going to be used in conjunction with the
   * {@link GetAllPackagesParameters.searchtype | searchtype} if provided.
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

/**
 * Request payload for package creation/replacement operations.
 *
 * @privateRemarks
 * TODO: support uploading documents during package creation
 *
 * @remarks
 * Request payload should at least contain {@link PackageData.name | 'name'} property.
 *
 * See {@link https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages.post | REST API documentation}
 * for more information.
 *
 * @public
 */
export interface PackageData {
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

/**
 * {@inheritDoc PackageData}
 * @public
 */
export type CreatePackageData = PackageData;

/**
 * {@inheritDoc PackageData}
 * @public
 */
export type UpdatePackageData = PackageData;
