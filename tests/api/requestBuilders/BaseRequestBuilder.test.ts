import { FetchError, Response } from 'node-fetch';

import { ClientError, OneSpanResponseError } from '../../../src';
import { BaseRequestBuilder } from '../../../src/api/requestBuilders/BaseRequestBuilder';
import { mockedFetch, mockFetchHappyPath } from '../../setup/mockNodeFetch';

const MOCK_URL = new URL('/index', 'http://test.com');

describe('BaseRequestBuilder', () => {
  let requestBuilder: BaseRequestBuilder;

  beforeAll(() => {
    mockFetchHappyPath();
  });

  afterAll(() => {
    mockedFetch.mockReset();
  });

  beforeEach(() => {
    requestBuilder = new BaseRequestBuilder(MOCK_URL);
  });

  afterEach(() => {
    mockedFetch.mockClear();
  });

  it('sends and receive JSON objects by default', async () => {
    await requestBuilder.fetch();

    expect(mockedFetch.mock.calls[0][1]?.headers).toStrictEqual({
      accept: expect.stringMatching(/^application\/json; esl-api-version=.+/),
      'content-type': 'application/json',
    });
  });

  describe('withAuthorizationHeader', () => {
    it('sets Authorization header with the provided string', async () => {
      await requestBuilder.withAuthorizationHeader('Basic 1234').fetch();

      expect(mockedFetch.mock.calls[0][1]?.headers).toStrictEqual(
        expect.objectContaining({
          authorization: 'Basic 1234',
        })
      );
    });

    it('calls the provided callback and set the Authorization header with the returned value', async () => {
      const headerCallback = jest.fn().mockResolvedValue('Basic 5678');

      await requestBuilder.withAuthorizationHeader(headerCallback).fetch();

      expect(headerCallback).toHaveBeenCalledTimes(1);
      expect(mockedFetch.mock.calls[0][1]?.headers).toStrictEqual(
        expect.objectContaining({
          authorization: 'Basic 5678',
        })
      );
    });
  });

  describe('withAcceptHeader', () => {
    it('sets Accept header with the provided string', async () => {
      await requestBuilder.withAcceptHeader('text/html').fetch();

      expect(mockedFetch.mock.calls[0][1]?.headers).toStrictEqual(
        expect.objectContaining({
          accept: expect.stringMatching(/^text\/html; esl-api-version=.+/),
        })
      );
    });
  });

  describe('withQueryParams', () => {
    it('appends the provided parameters to the URL of the request', async () => {
      await requestBuilder
        .withQueryParams({
          test: 'true',
          number: 1,
        })
        .fetch();

      expect(mockedFetch.mock.calls[0][0]).toMatchInlineSnapshot(`"http://test.com/index?test=true&number=1"`);
    });

    it('filters out parameters that are null or undefined', async () => {
      await requestBuilder
        .withQueryParams({
          test: 'true',
          number: 1,
          test1: null,
          test2: undefined,
        })
        .fetch();

      expect(mockedFetch.mock.calls[0][0]).toMatchInlineSnapshot(`"http://test.com/index?test=true&number=1"`);
    });
  });

  describe('fetch', () => {
    afterEach(() => {
      mockFetchHappyPath();
    });

    it('throws a OneSpanResponseError if the API response is not successful', async () => {
      const errorResponsePayload = {
        code: 123,
        message: 'API error message',
        messageKey: 'APIError',
      };

      mockedFetch.mockResolvedValue({
        ok: false,
        json: () => Promise.resolve(errorResponsePayload),
      } as Response);

      expect.assertions(4);

      try {
        await requestBuilder.fetch();
      } catch (err) {
        expect(err).toBeInstanceOf(OneSpanResponseError);
        expect((err as any).code).toStrictEqual(errorResponsePayload.code);
        expect((err as any).message).toStrictEqual(errorResponsePayload.message);
        expect((err as any).messageKey).toStrictEqual(errorResponsePayload.messageKey);
      }
    });

    it.each`
      name            | error                                                      | isAborted
      ${'FetchError'} | ${new FetchError('error', 'error')}                        | ${false}
      ${'AbortError'} | ${Object.create(Error, { name: { value: 'AbortError' } })} | ${true}
    `('throws a ClientError if a $name is thrown during the request', async ({ error, isAborted }) => {
      mockedFetch.mockImplementation(async () => {
        throw error;
      });

      expect.assertions(4);

      try {
        await requestBuilder.fetch();
      } catch (err) {
        expect(err).toBeInstanceOf(ClientError);
        expect((err as any).message).toStrictEqual('An error occurred on the client.');
        expect((err as any).isAborted).toStrictEqual(isAborted);
        expect((err as any).originalError).toStrictEqual(error);
      }
    });

    it('rethrows errors if no special handling has been specified', async () => {
      const error = new Error();

      mockedFetch.mockImplementation(async () => {
        throw error;
      });

      await expect(requestBuilder.fetch()).rejects.toThrow(error);
    });
  });
});
