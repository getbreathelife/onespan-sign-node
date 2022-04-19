import { AccessTokenOwnerConfig, Api, CallbackResource } from '../../src';
import { mockApiHappyPath, MockedApi, restoreMockedApi } from '../setup/mockApi';
import { mockedFetch, mockFetchHappyPath } from '../setup/mockNodeFetch';

const MOCK_TOKEN_CONFIG: AccessTokenOwnerConfig = {
  type: 'OWNER',
  clientId: 'clientId',
  secret: 'secret',
};
const MOCK_API_URL = 'http://demo.com';

describe('DocumentResource', () => {
  let mockedApi: MockedApi;
  let callback: CallbackResource;

  beforeAll(() => {
    mockFetchHappyPath();
    mockedApi = mockApiHappyPath();
    callback = new CallbackResource(new Api(MOCK_TOKEN_CONFIG, MOCK_API_URL));
  });

  afterAll(() => {
    restoreMockedApi(mockedApi);
    mockedFetch.mockReset();
  });

  afterEach(() => {
    mockedFetch.mockClear();
  });

  describe('get', () => {
    it('sends the request to fetch the callback settings correctly', async () => {
      await callback.get();

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/callback",
          Object {
            "headers": Object {
              "accept": "application/json; esl-api-version=11.46",
              "authorization": "Bearer mockedToken",
              "content-type": "application/json",
            },
            "method": "GET",
          },
        ]
      `);
    });
  });

  describe('get', () => {
    it('sends the request to setthe callback settings correctly', async () => {
      await callback.set({
        events: ['DOCUMENT_SIGNED'],
        url: 'https://localhost',
      });

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/callback",
          Object {
            "body": "{\\"events\\":[\\"DOCUMENT_SIGNED\\"],\\"url\\":\\"https://localhost\\"}",
            "headers": Object {
              "accept": "application/json; esl-api-version=11.46",
              "authorization": "Bearer mockedToken",
              "content-type": "application/json",
            },
            "method": "POST",
          },
        ]
      `);
    });
  });
});
