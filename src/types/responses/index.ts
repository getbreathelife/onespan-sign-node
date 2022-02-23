export * from './package';

export interface Response {
  body: NodeJS.ReadableStream;
  arrayBuffer: () => Promise<ArrayBuffer>;
  buffer: () => Promise<Buffer>;
}
