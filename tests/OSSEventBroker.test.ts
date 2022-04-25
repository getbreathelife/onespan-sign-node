import { Readable } from 'node:stream';

import { EventMessageError, OSSEventBroker } from '../src';

describe('OSSEventBroker', () => {
  let broker: OSSEventBroker;

  beforeEach(() => {
    broker = new OSSEventBroker();
  });

  describe('getHandler', () => {
    it('returns undefined if no callback function is associated with the provided key', () => {
      expect(broker.getHandler('DOCUMENT_SIGNED')).toBeUndefined();
    });

    it('returns callback function if one is associated with the provided key', () => {
      const expectedCallback = (): void => {};

      Object.defineProperty(broker, 'handlers', {
        value: {
          DOCUMENT_SIGNED: expectedCallback,
        },
      });

      expect(broker.getHandler('DOCUMENT_SIGNED')).toBe(expectedCallback);
    });
  });

  describe('setHandler', () => {
    it('associates the callback function with the correct event key', () => {
      const expectedCallback = (): void => {};

      broker.setHandler('DOCUMENT_VIEWED', expectedCallback);

      expect(broker.getHandler('DOCUMENT_VIEWED')).toBe(expectedCallback);
    });

    it('reassigns the callback function with the correct event key for subsequent set calls', () => {
      const expectedCallback = (): void => {};
      const expectedCallback2 = (): void => {};

      broker.setHandler('DOCUMENT_VIEWED', expectedCallback);
      expect(broker.getHandler('DOCUMENT_VIEWED')).toBe(expectedCallback);

      broker.setHandler('DOCUMENT_VIEWED', expectedCallback2);
      expect(broker.getHandler('DOCUMENT_VIEWED')).toBe(expectedCallback2);
    });
  });

  describe('removeHandler', () => {
    it('removes the association between the callback function with the specified event key', () => {
      const expectedCallback = (): void => {};

      broker.setHandler('PACKAGE_ACTIVATE', expectedCallback);
      expect(broker.getHandler('PACKAGE_ACTIVATE')).toBe(expectedCallback);

      broker.removeHandler('PACKAGE_ACTIVATE');
      expect(broker.getHandler('PACKAGE_ACTIVATE')).toBeUndefined();
    });
  });

  describe('handle', () => {
    const handlerCallback = jest.fn();

    beforeEach(() => {
      handlerCallback.mockClear();
      broker.setHandler('PACKAGE_COMPLETE', handlerCallback);
    });

    it.each`
      type          | payload
      ${'string'}   | ${'payload'}
      ${'number'}   | ${123}
      ${'array'}    | ${[{ test: 'test' }]}
      ${'non-POJO'} | ${new Date()}
    `('throws an EventMessageError if an invalid payload ($type) is passed in', async ({ payload }) => {
      expect.assertions(3);

      try {
        await broker.handle(payload);
      } catch (err) {
        expect(err).toBeInstanceOf(EventMessageError);
        expect((err as EventMessageError).message).toStrictEqual(
          'Unable to match an event handler because: the request body is not a valid object.'
        );
        expect((err as EventMessageError).errorCode).toStrictEqual('INVALID_REQUEST_BODY');
      }
    });

    it.each`
      type          | payload
      ${'string'}   | ${'payload'}
      ${'array'}    | ${JSON.stringify([{ test: 'test' }])}
      ${'non-POJO'} | ${JSON.stringify(new Date())}
    `('throws an EventMessageError if an invalid payload stream ($type) is passed in', async ({ payload }) => {
      expect.assertions(3);

      try {
        await broker.handle(Readable.from(payload));
      } catch (err) {
        expect(err).toBeInstanceOf(EventMessageError);
        expect((err as EventMessageError).message).toStrictEqual(
          'Unable to match an event handler because: the request body is not a valid object.'
        );
        expect((err as EventMessageError).errorCode).toStrictEqual('INVALID_REQUEST_BODY');
      }
    });

    it('throws an EventMessageError if there is missing required property in the request payload', async () => {
      expect.assertions(3);

      const eventMessage = {
        sessionUser: 'user',
        packageId: 'packageId',
        createdDate: new Date().toISOString(),
      };

      try {
        await broker.handle(eventMessage);
      } catch (err) {
        expect(err).toBeInstanceOf(EventMessageError);
        expect((err as EventMessageError).message).toStrictEqual(
          'Unable to match an event handler because: the request body does not contain the "name" property.'
        );
        expect((err as EventMessageError).errorCode).toStrictEqual('MISSING_NAME_PROPERTY');
      }
    });

    it('does not pass the event message to the callback if no callback is specified for the event', async () => {
      const eventMessage = {
        name: 'PACKAGE_ACTIVATE',
        sessionUser: 'user',
        packageId: 'packageId',
        createdDate: new Date().toISOString(),
      };

      await broker.handle(eventMessage);

      expect(handlerCallback).not.toBeCalled();
    });

    it.each`
      variant     | transformFunc
      ${'object'} | ${(obj: any) => obj}
      ${'string'} | ${(obj: any) => JSON.stringify(obj)}
      ${'stream'} | ${(obj: any) => Readable.from(JSON.stringify(obj))}
    `(
      'passes the event message $variant as an object to the callback if the event name matches an association',
      async ({ transformFunc }) => {
        const eventMessage = {
          name: 'PACKAGE_COMPLETE',
          sessionUser: 'user',
          packageId: 'packageId',
          createdDate: new Date().toISOString(),
        };

        await broker.handle(transformFunc(eventMessage));

        expect(handlerCallback).toBeCalledWith(expect.objectContaining(eventMessage));
      }
    );
  });
});
