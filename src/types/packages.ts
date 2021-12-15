import { OneSpanDocument } from './documents';
import { OneSpanRole } from './roles';

export enum OneSpanPackageType {
  'PACKAGE',
  'TEMPLATE',
  'LAYOUT',
}

export enum OneSpanPackageStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED',
  DECLINED = 'DECLINED',
  OPTED_OUT = 'OPTED_OUT',
  ARCHIVED = 'ARCHIVED',
}

type OneSpanPackageSettings = {
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
};

// OneSpan allows us to add extra data to the package (they just pass it through), which we use to identify the ceremony a package belongs to
// when we get a OneSpan callback event.
// More details:
// https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/custom-transaction-data
type CustomPackageData = Record<string, string>;

export type CreatePackageRequestPayload = {
  name: string;
  type: OneSpanPackageType;
  status: OneSpanPackageStatus;
  documents: OneSpanDocument[];
  roles: OneSpanRole[];
  due: string;
  data: CustomPackageData;
  settings: OneSpanPackageSettings;
};

export type CreatePackageResponsePayload = {
  id: string;
};
