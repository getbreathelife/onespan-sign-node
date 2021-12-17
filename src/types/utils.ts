export type OptionalExclude<T, Exclusion extends keyof T> = Required<Pick<T, Exclusion>> & Partial<Omit<T, Exclusion>>;

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};
