/**
 * A library to interact with OneSpan Sign's API.
 *
 * @example
 * ```ts
 * const oneSpanSign = new OneSpanSign({
 *   clientId: CLIENT_ID,
 *   secret: CLIENT_SECRET,
 *   type: 'OWNER',   // or 'SENDER'
 * }, API_URL);
 *
 * const { id: packageId } = await oneSpanSign.packages.create({...});
 *
 * await oneSpanSign.documents.create(packageId, ...)
 * ```
 *
 * @packageDocumentation
 */

export { OneSpanSign as default } from './OneSpanSign';
export * from './OSSEventBroker';
export * from './api';
export * from './resources';
export * from './types';
