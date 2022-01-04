/**
 * Make `T` either its own type or null
 * @public
 */
export type Nullable<T> = T | null;

/**
 * Recursively make properties in `T` optional
 * @public
 */
export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};
