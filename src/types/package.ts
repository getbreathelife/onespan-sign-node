import { DocumentMetadata } from './document';
import { Message } from './message';
import { Role, Sender } from './role';
import { OptionalExclude, RecursivePartial } from './utils';

type PackageType = 'PACKAGE' | 'TEMPLATE' | 'LAYOUT';
type PackageStatus = 'DRAFT' | 'SENT' | 'COMPLETED' | 'EXPIRED' | 'DECLINED' | 'OPTED_OUT' | 'ARCHIVED';
type PackageVisibility = 'ACCOUNT' | 'SENDER';

// TODO: Type all properties of `ceremony`
type PackageSettings = OptionalExclude<
  {
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
  },
  'ceremony'
>;

// TODO: Type these
type PackageArtifactsLimits = {};
type SignedDocumentDelivery = {};

type Package = OptionalExclude<
  {
    name: string;
    roles: Role[];
    status: PackageStatus;
    created: string;
    messages: Message[];
    id: string;
    data: Record<string, any>;
    description: string;
    language: string;
    autocomplete: boolean;
    type: PackageType;
    due: string;
    visibility: PackageVisibility;
    settings: PackageSettings;
    consent: string;
    notaryRoleId: string;
    trashed: boolean;
    notarized: boolean;
    timezoneId: string;
    documents: DocumentMetadata[];
    emailMessage: string;
    updated: string;
    completed: string;
    sender: Sender;
    limits: PackageArtifactsLimits;
    signedDocumentDelivery: SignedDocumentDelivery;
    bulkSendable: boolean;
  },
  | 'autocomplete'
  | 'bulkSendable'
  | 'created'
  | 'description'
  | 'documents'
  | 'emailMessage'
  | 'id'
  | 'messages'
  | 'name'
  | 'notarized'
  | 'roles'
  | 'sender'
  | 'status'
  | 'trashed'
  | 'type'
  | 'updated'
  | 'visibility'
>;

// TODO: support uploading documents during package creation
// Request payload should at least contain 'name' property
// https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages.post
export type CreatePackageRequestPayload = RecursivePartial<Package> & Required<Pick<Package, 'name'>>;

export type CreatePackageResponsePayload = {
  id: string;
};
