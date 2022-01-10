import { PackageResource, PackageRequestPayload, Api } from '../../src';
import { mockedFetch, mockFetchHappyPath } from '../setup/mockNodeFetch';

const MOCK_API_KEY = 'demoKey';
const MOCK_API_URL = 'http://demo.com';

describe('PackageResource', () => {
  let packages: PackageResource;

  beforeAll(() => {
    mockFetchHappyPath();
    packages = new PackageResource(new Api(MOCK_API_KEY, MOCK_API_URL));
  });

  afterAll(() => {
    mockedFetch.mockReset();
  });

  afterEach(() => {
    mockedFetch.mockClear();
  });

  describe('create', () => {
    it('sends the provided payload as request body', async () => {
      const payload: PackageRequestPayload = {
        name: 'mock package',
      };

      await packages.create(payload);

      expect(mockedFetch.mock.calls[0]).toMatchSnapshot();
    });
  });
});
