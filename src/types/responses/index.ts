export * from './package';
export * from './sender';

/** @public **/
export interface Response {
  body: NodeJS.ReadableStream;
  arrayBuffer: () => Promise<ArrayBuffer>;
  buffer: () => Promise<Buffer>;
}

/** @public */
export interface BulkGetResponse<T> {
  count: number;
  results: T[];
}
