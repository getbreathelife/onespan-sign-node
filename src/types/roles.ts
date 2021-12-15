type RoleType = 'SIGNER' | 'SENDER';

type SignerStatus = 'SIGNED' | 'EMAIL_BOUNCED' | 'SIGNER_LOCKED_OUT' | 'EXPIRED';

type Signer = {
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

export type Role = {
  id?: string;
  index: number;
  type: RoleType;
  name: string;
  signers: Signer[];
};
