export enum OneSpanRoleType {
  'SIGNER' = 'SIGNER',
  'SENDER' = 'SENDER',
}

export enum SignerStatus {
  SIGNED = 'SIGNED',
  EMAIL_BOUNCED = 'EMAIL_BOUNCED',
  SIGNER_LOCKED_OUT = 'SIGNER_LOCKED_OUT',
  EXPIRED = 'EXPIRED',
}

export type OneSpanSigner = {
  id: string;
  status?: SignerStatus;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  auth?: {
    scheme: 'SMS';
    challenges: [
      {
        answer: null;
        question: string;
        maskInput: boolean;
      }
    ];
  };
};

export type OneSpanRole = {
  id?: string;
  index: number;
  type: OneSpanRoleType;
  name: string;
  signers: OneSpanSigner[];
};
