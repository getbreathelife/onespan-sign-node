import { CustomData } from '../../shared';
import { Nullable } from '../../utils';
import { DocumentVisibilityConfiguration } from '../document';
import { LayoutOptions, LayoutStyle } from './layout';

/** @public */
export interface Link {
  title: Nullable<string>;
  href: string;
  text: string;
}

/** @public */
export interface DocumentToolbarOptions {
  id: Nullable<string>;
  data: Nullable<CustomData>;
  name: Nullable<string>;
  configurations: Nullable<DocumentVisibilityConfiguration[]>;
}

/** @public */
export interface CeremonyEventComplete {
  dialog: Nullable<boolean>;
  redirect: Nullable<string>;
}

/** @public */
export interface CeremonyEvents {
  complete: Nullable<CeremonyEventComplete>;
}

/** @public */
export interface CeremonySettings {
  enforceCaptureSignature: boolean;
  inPerson: boolean;
  declineButton: boolean;
  declineReasons: string[];
  disableDeclineOther: boolean;
  disableDownloadForUncompletedPackage: boolean;
  disableFirstInPersonAffidavit: boolean;
  disableInPersonAffidavit: boolean;
  disableOptOutOther: boolean;
  disableSecondInPersonAffidavit: boolean;
  hideCaptureText: boolean;
  hideLanguageDropdown: boolean;
  hidePackageOwnerInPerson: boolean;
  hideWatermark: boolean;
  optOutButton: boolean;
  optOutReasons: string[];
  extractAcroFields: boolean;
  extractTextTags: boolean;
  ada: boolean;

  layout: Nullable<LayoutOptions>;
  events: Nullable<CeremonyEvents>;
  handOver: Nullable<Link>;
  documentToolbarOptions: Nullable<DocumentToolbarOptions>;
  maxAuthFailsAllowed: Nullable<number>;
  style: Nullable<LayoutStyle>;
}
