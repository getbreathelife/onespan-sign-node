/**
 * Error thrown when there's an error on the message received by the OSSEventBroker.
 *
 * @public
 */
export class EventMessageError extends Error {
  public readonly name = 'EventMessageError';
  public readonly errorCode: string;

  constructor(reason: string, errorCode: string) {
    super(`Unable to match an event handler because: ${reason}`);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, EventMessageError);
    }

    this.errorCode = errorCode;
  }
}
