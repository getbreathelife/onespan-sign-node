import { AccessTokenOwnerConfig, Api } from '../../src';
import { mockedFetch, mockFetchHappyPath } from '../setup/mockNodeFetch';

const MOCK_TOKEN_CONFIG: AccessTokenOwnerConfig = {
  type: 'OWNER',
  clientId: 'clientId',
  secret: 'secret',
};
const MOCK_API_URL = 'http://demo.com';

describe('Api', () => {
  describe('Authorization header', () => {
    let api: Api;

    beforeAll(() => {
      mockFetchHappyPath();
      api = new Api(MOCK_TOKEN_CONFIG, MOCK_API_URL);
    });

    afterAll(() => {
      mockedFetch.mockReset();
    });

    afterEach(() => {
      mockedFetch.mockClear();
    });

    it('attempts to fetch an access token if access token is not yet fetched (undefined)', async () => {
      await api.get('http://test.com').fetch();
      expect(mockedFetch.mock.calls.length).toStrictEqual(2);
      expect(mockedFetch.mock.calls[0]).toMatchSnapshot();
    });

    it('does not fetch an access token if the token is defined and not expired', async () => {
      Object.defineProperty(api, 'accessToken', {
        value: 'token',
      });
      Object.defineProperty(api, 'tokenExpiry', {
        value: Date.now() + 1,
      });

      await api.get('http://test.com').fetch();
      expect(mockedFetch.mock.calls.length).toStrictEqual(1);
    });

    it.each`
      tokenExpiryGetter
      ${() => Date.now()}
      ${() => Date.now() - 1}
    `('attempts to fetch an access token if access token is expired', async ({ tokenExpiryGetter }) => {
      Object.defineProperty(api, 'accessToken', {
        value: 'token',
      });
      Object.defineProperty(api, 'tokenExpiry', {
        value: tokenExpiryGetter(),
      });

      await api.get('http://test.com').fetch();
      expect(mockedFetch.mock.calls.length).toStrictEqual(2);
    });
  });
});
