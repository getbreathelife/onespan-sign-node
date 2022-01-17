/** @public */
export type RoleType = 'SIGNER' | 'SENDER';

/** @public */
export type SignerStatus = 'SIGNED' | 'EMAIL_BOUNCED' | 'SIGNER_LOCKED_OUT' | 'EXPIRED';

/**
 * @privateRemarks
 * TODO - #3
 *
 * @alpha
 */
export type Signer = {
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

/**
 * @privateRemarks
 * TODO - #3
 *
 * @alpha
 */
export type Sender = null;

/**
 * @privateRemarks
 * TODO - #3
 *
 * @alpha
 */
export type Role = {
  id?: string;
  index: number;
  type: RoleType;
  name: string;
  signers: Signer[];
};
