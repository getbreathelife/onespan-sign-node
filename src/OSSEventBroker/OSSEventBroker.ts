import { Readable } from 'node:stream';
import { EventHandler, Events } from 'types';

import { EventMessageError } from './error';

/**
 * Helper class to ingest
 * {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/setting-callback-notifications | callback notifications}
 * from OneSpan Sign and call the appropriate handler.
 *
 * @public
 */
export class OSSEventBroker {
  protected handlers: { [key in keyof Events.LOOKUP_TABLE]?: EventHandler<Events.LOOKUP_TABLE[key]> } = {};

  /**
   * Gets the handler for a callback event.
   *
   * @param key - Name of the event. See {@link Events.LOOKUP_TABLE} for the list of valid keys.
   */
  public getHandler<T extends keyof Events.LOOKUP_TABLE>(key: T): EventHandler<Events.LOOKUP_TABLE[T]> | undefined {
    return key in this.handlers && this.handlers[key]
      ? (this.handlers[key] as EventHandler<Events.LOOKUP_TABLE[T]>)
      : undefined;
  }

  /**
   * Sets the handler for a callback event.
   *
   * @param key - Name of the event. See {@link Events.LOOKUP_TABLE} for the list of valid keys.
   * @param handler - Callback function to handle the event message.
   */
  public setHandler<T extends keyof Events.LOOKUP_TABLE>(key: T, handler: EventHandler<Events.LOOKUP_TABLE[T]>): void {
    Object.defineProperty(this.handlers, key, {
      value: handler,
    });
  }

  protected async parseStream(stream: Readable): Promise<Record<string, any>> {
    return new Promise((resolve) => {
      let message = '';

      stream.on('data', (chunk) => {
        message += chunk;
      });

      stream.on('end', () => {
        resolve(JSON.parse(message));
      });
    });
  }

  /**
   * Check if provided object is a POJO (Plain Old Javascript Object)
   *
   * @param param - Parameter to be checked
   *
   * @privateRemarks
   * - {@link https://masteringjs.io/tutorials/fundamentals/pojo | Reference}
   *
   * @internal
   */
  protected isPOJO(param: unknown): param is Record<string, any> {
    if (param === null || typeof param !== 'object') {
      return false;
    }
    const proto = Object.getPrototypeOf(param);
    // Prototype may be null if you used `Object.create(null)`
    // Checking `proto`'s constructor is safe because `getPrototypeOf()`
    // explicitly crosses the boundary from object data to object metadata
    return !proto || proto.constructor.name === 'Object';
  }

  /**
   * Handles incoming messages from OneSpan Sign by passing the message to an
   * appropriate handler (if set).
   *
   * @param message - Incoming message.
   *
   * @remarks
   * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/setting-callback-notifications | Setting Up Callback Notifications (OneSpan Sign)}
   *
   * @example
   * ```ts
   *  import * as http from 'node:http';
   *  import { OSSEventBroker } from 'onespan-sign-node';
   *
   *  const broker = new OSSEventBroker();
   *  broker.setHandler('DOCUMENT_SIGNED', onDocumentSigned);
   *
   *  const server = http.createServer((req, res) => {
   *    if (req.url === EVENT_CALLBACK_URL) {
   *      broker.handle(req);
   *    }
   *  });
   *
   *  server.listen(8080);
   * ```
   */
  public async handle(message: Readable | string | Record<string, any>): Promise<void> {
    let body;

    if (message instanceof Readable) {
      body = await this.parseStream(message);
    } else if (typeof message === 'string') {
      body = JSON.parse(message);
    } else {
      body = message;
    }

    if (!this.isPOJO(body)) {
      throw new EventMessageError('the request body is not a valid object.', 'INVALID_REQUEST_BODY');
    }

    if (!('name' in body)) {
      throw new EventMessageError('the request body does not contain the "name" property.', 'MISSING_NAME_PROPERTY');
    }

    const handler = this.getHandler(body.name);

    if (handler !== undefined) {
      handler(body);
    }
  }
}
