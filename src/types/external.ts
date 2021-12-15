import { OptionalExclude } from './utils';

export type External = OptionalExclude<
  {
    id: string;
    provider: string;
    providerName: string;
    data: Record<string, any>;
  },
  'id' | 'provider'
>;
