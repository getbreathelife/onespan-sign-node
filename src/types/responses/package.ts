import { Package } from '../models';

/** @public */
export interface CreatePackage {
  id: string;
}

/** @public */
export interface GetAllPackages {
  count: number;
  results: Package[];
}
