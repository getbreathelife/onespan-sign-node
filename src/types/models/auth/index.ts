import { Nullable } from '../../utils';
import * as KnowledgeBasedAuthentication from './kba';

/** @public */
type AuthScheme = 'NONE' | 'PROVIDER' | 'CHALLENGE' | 'SMS' | 'SSO' | 'KBA' | 'SAA';

/** @public */
interface AuthChallenge {
  question: string;
  answer: Nullable<string>;
  maskInput: boolean;
}

/**
 * Configuration for OneSpan identity verification workflow
 *
 * @remarks
 * - {@link https://community.onespan.com/products/onespan-identity-verification/getting-started | Getting Started with OneSpan Identity Verification}
 *
 * @public
 */
interface IdvWorkflow {
  /**
   * @example
   * 00000000-0000-0001-0000-200000000055
   */
  id: Nullable<string>;

  /**
   * @example
   * DV
   */
  type: Nullable<string>;

  /**
   * @example
   * OSS
   */
  tenant: Nullable<string>;

  /**
   * @example
   * This is Mitek Document verification only Mock workflow.
   */
  desc: Nullable<string>;
  skipWhenAccessingSignedDocuments: Nullable<string>;
}

/** @public */
interface Auth {
  scheme: AuthScheme;
  challenges: AuthChallenge[];
  idvWorkflow: Nullable<IdvWorkflow>;
}

export {
  Auth as default,
  Auth,
  AuthScheme as Scheme,
  AuthChallenge as Challenge,
  IdvWorkflow,
  KnowledgeBasedAuthentication,
};
