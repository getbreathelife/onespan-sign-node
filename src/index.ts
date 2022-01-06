/**
 * A library to interact with OneSpan Sign's API.
 *
 * @example
 * ```ts
 * const oneSpanSign = new OneSpanSign(API_KEY, API_URL);
 *
 * const { id: packageId } = await oneSpanSign.packages.create({...});
 *
 * await oneSpanSign.documents.create(packageId, ...)
 * ```
 *
 * @packageDocumentation
 */

export { OneSpanSign } from './OneSpanSign';
export * from './resources';
export * from './types';
