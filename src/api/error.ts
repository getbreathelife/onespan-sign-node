/**
 * Error thrown when there's an error on the client.
 * For example, operational errors or aborted requests.
 *
 * @public
 */
export class ClientError extends Error {
  public readonly name = 'ClientError';
  public readonly isAborted: boolean;
  public readonly originalError: Error;

  constructor(error: Error) {
    super('An error occurred on the client.');

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ClientError);
    }

    this.isAborted = error.name === 'AbortError';
    this.originalError = error;
  }
}

/**
 * Error thrown when there's an unsuccessful response from OneSpan Sign's API.
 * More specifically, API responses with status code &gt;= 200 && &lt; 300.
 *
 * @public
 */
export class OneSpanResponseError extends Error {
  public readonly name = 'OneSpanResponseError';
  public readonly code?: number;
  public readonly messageKey?: string;

  constructor(response: Record<string, any>, public readonly statusCode: number) {
    super(response.message ?? 'An unsuccessful response has been received from the API call.');

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, OneSpanResponseError);
    }

    this.code = response.code;
    this.messageKey = response.messageKey;
  }
}
