import { CustomData } from '../../shared';
import { Nullable } from '../../utils';
import { DocumentMetadata } from '../document';
import { External } from '../external';
import { Message } from '../message';
import { Role } from '../role';
import { Sender } from '../sender';
import { CeremonySettings } from './ceremony';

/** @public */
export type PackageType = 'PACKAGE' | 'TEMPLATE' | 'LAYOUT';

/** @public */
export type PackageStatus = 'DRAFT' | 'SENT' | 'COMPLETED' | 'EXPIRED' | 'DECLINED' | 'OPTED_OUT' | 'ARCHIVED';

/** @public */
export type PackageVisibility = 'ACCOUNT' | 'SENDER';

/** @public */
export interface PackageSettings {
  ceremony: CeremonySettings;
}

/** @public */
export interface PackageArtifactsLimits {
  roles: Nullable<number>;
  documents: Nullable<number>;
}

/** @public */
export interface SignedDocumentDelivery {
  destinations: External[];
  excludedDocuments: DocumentMetadata[];
  filePrefix: Nullable<string>;
  fileSuffix: Nullable<string>;
}

/** @public */
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
  data: Nullable<CustomData>;

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
