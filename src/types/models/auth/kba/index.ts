import { Nullable } from '../../../utils';
import * as SignerInformation from './signerInformation';

/** @public */
type Status = 'NOT_YET_ATTEMPTED' | 'PASSED' | 'FAILED' | 'INVALID_SIGNER' | 'UPDATED';

/** @public */
interface KnowledgeBasedAuthentication {
  knowledgeBasedAuthenticationStatus: Nullable<Status>;
  signerInformationForEquifaxCanada: Nullable<SignerInformation.EquifaxCanada>;
  signerInformationForEquifaxUSA: Nullable<SignerInformation.EquifaxUSA>;
  equifaxCanada: Nullable<boolean>;
  equifaxUSA: Nullable<boolean>;
}

export { KnowledgeBasedAuthentication as default, Status, SignerInformation };
