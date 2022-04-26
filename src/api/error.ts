/**
 * Error thrown when there's an error on the client.
 * For example, operational errors or aborted requests.
 * @public
 */
export class ClientError extends Error {
  /**
   * Name of the error.
   * @readonly
   */
  public readonly name = 'ClientError';
  /**
   * Set to `true` if the error is thrown because the request is aborted.
   * @readonly
   */
  public readonly isAborted: boolean;
  /**
   * Original error thrown by the client.
   * @readonly
   */
  public readonly originalError: Error;

  /**
   * @param error - Error object thrown from the client
   * @public
   */
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
 * More specifically, API responses with status code in the range 200-299.
 * @public
 */
export class OneSpanResponseError extends Error {
  /**
   * Name of the error.
   * @readonly
   */
  public readonly name = 'OneSpanResponseError';
  /**
   * Code property returned from OneSpan Sign's API.
   * @readonly
   */
  public readonly code?: number;
  /**
   * Message key property returned from OneSpan Sign's API.
   * @readonly
   */
  public readonly messageKey?: string;

  /**
   * @param response - Response payload returned by OneSpan Sign's API
   * @param statusCode - Response status code
   * @public
   */
  constructor(response: Record<string, any>, public readonly statusCode: number) {
    super(response.message ?? 'An unsuccessful response has been received from the API call.');

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, OneSpanResponseError);
    }

    this.code = response.code;
    this.messageKey = response.messageKey;
  }
}
