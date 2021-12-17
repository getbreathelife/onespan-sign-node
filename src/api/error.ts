import { Response } from 'node-fetch';

// TODO - #4: Set `code`, `messageKey` and `messages` from OneSpan's error response as public class property
export class HttpResponseError extends Error {
  constructor(public response: Response) {
    super(`HTTP Error Response: ${response.status} ${response.statusText}`);
  }
}
