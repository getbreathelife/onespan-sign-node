/**
 * A library to interact with OneSpan Sign's API.
 *
 * @example
 * ```ts
 * const oneSpanSign = new OneSpanSign({
 *   clientId: CLIENT_ID,
 *   secret: CLIENT_SECRET,
 *   type: 'OWNER',   // or 'SENDER'
 * });
 *
 * const { id: packageId } = await oneSpanSign.packages.create({...});
 *
 * await oneSpanSign.documents.create(packageId, ...)
 * ```
 *
 * @packageDocumentation
 */

export { OneSpanSign } from './OneSpanSign';
export * from './api';
export * from './resources';
export * from './types';
export * from './types/requests';
