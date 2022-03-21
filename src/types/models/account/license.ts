import { Nullable } from '../../utils';
import { CustomData, DateTimeString } from '../shared';

/** @public */
type Cycle = 'DAY' | 'MONTH' | 'YEAR';

/** @public */
interface CycleCount {
  cycle: Cycle;
  count: number;
}

/** @public */
interface Quota {
  limit: number;
  target: 'SIGNER' | 'SENDER' | 'DOCUMENT' | 'PACKAGE' | 'STORAGE';
  cycle: Nullable<Cycle>;
  scope: Nullable<'SENDER' | 'DOCUMENT' | 'PACKAGE' | 'ACCOUNT'>;
}

/** @public */
interface Price {
  amount: number;
  currency: {
    id: string;
    name: string;
    data: CustomData;
  };
}

/** @public */
interface Transaction {
  price: Price;
  creditCard: {
    name: string;
    type: string;
    number: number;
    expiration: {
      month: number;
      year: number;
    };
    cvv: Nullable<string>;
  };
  created: DateTimeString;
}

/** @public */
interface Plan {
  id: string;
  name: string;
  cycle: Cycle;
  description: string;
  group: string;
  price: Price;
  quotas: Quota[];
  features: CustomData;
  data: CustomData;
  contract: Nullable<Cycle>;
  freeCycles: Nullable<CycleCount>;
  original: Nullable<string>;
}

/** @public */
interface License {
  status: 'ACTIVE' | 'PENDING' | 'GRACE';
  plan: Plan;
  transactions: Transaction[];
  created: DateTimeString;
  paidUntil: Nullable<DateTimeString>;
}

export { License as default, Plan, Cycle, Transaction, Price, Quota, CycleCount };
