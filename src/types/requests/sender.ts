import { Sender } from '../models';
import { RecursivePartial } from '../utils';

/** @public */
export interface GetAllSendersParameters {
  /** String used to filter on the results */
  search?: string;

  /** The first record that will be returned. Useful for pagination. */
  from?: number;

  /** The last record that will be returned. Useful for pagination. */
  to?: number;

  /** The direction according to which the data will be sorted. 'asc' for ascending and 'desc' for descending. */
  dir?: 'asc' | 'desc';
}

/**
 * @public
 *
 * @privateRemarks
 * OneSpan's {@link https://community.onespan.com/products/onespan-sign/sandbox#/Senders/api.account.senders.post | request schema}
 * is not consistent with their
 * {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/managing-senders | examples}.
 * This interface will likely require further revision.
 */
export type CreateSenderData = RecursivePartial<Sender> & {
  email: string;
};
