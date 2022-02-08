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
      accept: 'application/json',
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
          accept: 'text/html',
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
});
