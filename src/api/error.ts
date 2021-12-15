import { Response } from 'node-fetch';

export class HttpResponseError extends Error {
  constructor(public response: Response) {
    super(`HTTP Error Response: ${response.status} ${response.statusText}`);
  }
}
