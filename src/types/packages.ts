import { Role } from './roles';

type PackageType = 'PACKAGE' | 'TEMPLATE' | 'LAYOUT';

type PackageStatus = 'DRAFT' | 'SENT' | 'COMPLETED' | 'EXPIRED' | 'DECLINED' | 'OPTED_OUT' | 'ARCHIVED';

type PackageSettings = {
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

// OneSpan allows us to add extra data to the package (they just pass it through)
// More details:
// https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/custom-transaction-data
type CustomPackageData = Record<string, string>;

// TODO: support uploading documents during package creation
export type CreatePackageRequestPayload = {
  name: string;
  type?: PackageType;
  status?: PackageStatus;
  roles?: Pick<Role, 'id' | 'name' | 'type' | 'signers'>[];
  due: string;
  data: CustomPackageData;
  settings: PackageSettings;
};

export type CreatePackageResponsePayload = {
  id: string;
};
