import { Readable } from 'node:stream';

import { EventHandler, Events } from '../types';
import { EventMessageError } from './error';

/**
 * Helper class to ingest
 * {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/setting-callback-notifications | callback notifications}
 * from OneSpan Sign and call the appropriate handler.
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
 *
 * @public
 */
export class OSSEventBroker {
  /**
   * Stored event handlers
   * @internal
   */
  protected handlers: { [key in keyof Events.InterfaceMap]?: EventHandler<Events.InterfaceMap[key]> } = {};

  /**
   * Gets the handler for a callback event.
   *
   * @param key - Name of the event. See {@link Events.InterfaceMap} for the list of valid keys.
   * @public
   */
  public getHandler<T extends keyof Events.InterfaceMap>(key: T): EventHandler<Events.InterfaceMap[T]> | undefined {
    return key in this.handlers && this.handlers[key]
      ? (this.handlers[key] as EventHandler<Events.InterfaceMap[T]>)
      : undefined;
  }

  /**
   * Sets the handler for a callback event.
   *
   * @param key - Name of the event. See {@link Events.InterfaceMap} for the list of valid keys.
   * @param handler - Callback function to handle the event message.
   * @public
   */
  public setHandler<T extends keyof Events.InterfaceMap>(key: T, handler: EventHandler<Events.InterfaceMap[T]>): void {
    Object.defineProperty(this.handlers, key, {
      value: handler,
      configurable: true,
      enumerable: true,
      writable: true,
    });
  }

  /**
   * Removes the handler for a callback event.
   *
   * @param key - Name of the event. See {@link Events.InterfaceMap} for the list of valid keys.
   * @public
   */
  public removeHandler<T extends keyof Events.InterfaceMap>(key: T): void {
    if (key in this.handlers) {
      delete this.handlers[key];
    }
  }

  /**
   * Parse stream data into an object.
   *
   * @param stream - Stream data
   * @internal
   */
  protected async parseStream(stream: Readable): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      let message = '';

      stream.on('data', (chunk) => {
        message += chunk;
      });

      stream.on('end', () => {
        try {
          resolve(JSON.parse(message));
        } catch (err) {
          reject(err);
        }
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
   * @public
   */
  public async handle(message: Readable | string | Record<string, any>): Promise<void> {
    let body;

    try {
      if (message instanceof Readable) {
        body = await this.parseStream(message);
      } else if (typeof message === 'string') {
        body = JSON.parse(message);
      } else {
        body = message;
      }
    } catch (err) {
      if (err instanceof SyntaxError) {
        // Handles invalid JSON
        throw new EventMessageError('the request body is not a valid object.', 'INVALID_REQUEST_BODY');
      }
      throw err;
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
