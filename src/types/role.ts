type RoleType = 'SIGNER' | 'SENDER';

type SignerStatus = 'SIGNED' | 'EMAIL_BOUNCED' | 'SIGNER_LOCKED_OUT' | 'EXPIRED';

// TODO - #3
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

// TODO - #3
export type Sender = null;

// TODO - #3
export type Role = {
  id?: string;
  index: number;
  type: RoleType;
  name: string;
  signers: Signer[];
};
