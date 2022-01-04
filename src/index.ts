/**
 * A library to interact with OneSpan Sign's API.
 *
 * @example
 * ```ts
 * const oneSpanSign = new OneSpanSign(API_KEY, API_URL);
 *
 * const { id: packageId } = await oneSpanSign.createPackage({...});
 *
 * await oneSpanSign.uploadDocument(packageId, ...)
 * ```
 *
 * @packageDocumentation
 */

export { OneSpanSign } from './OneSpanSign';
export * from './types';
