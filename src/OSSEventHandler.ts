import { EventHandler, Events } from 'types';

/**
 * Helper class to ingest
 * {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/setting-callback-notifications | callback notifications}
 * from OneSpan Sign and call the appropriate handler.
 *
 * @public
 */
export class OSSEventBroker {
  protected _documentSignedHandler?: EventHandler<Events.DocumentSignedEvent>;

  public get documentSignedHandler(): EventHandler<Events.DocumentSignedEvent> | undefined {
    return this._documentSignedHandler;
  }

  public set documentSignedHandler(handler) {
    this._documentSignedHandler = handler;
  }
}
