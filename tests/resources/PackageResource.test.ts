import { PackageResource, Requests, Api } from '../../src';
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
      const payload: Requests.CreatePackageData = {
        name: 'mock package',
      };

      await packages.create(payload);

      expect(mockedFetch.mock.calls[0]).toMatchSnapshot();
    });
  });

  describe('getAll', () => {
    it('sends the provided parameters as query parameters', async () => {
      const params: Requests.GetAllPackagesParameters = {
        query: 'inbox',
        predefined: 'all',
        sort: undefined,
      };

      await packages.getAll(params);

      expect(mockedFetch.mock.calls[0]).toMatchSnapshot();
    });

    it('does not append any query parameter if no parameter is passed in', async () => {
      await packages.getAll();

      expect(mockedFetch.mock.calls[0]).toMatchSnapshot();
    });

    it('serializes Date objects into ISO strings', async () => {
      const params: Requests.GetAllPackagesParameters = {
        query: 'inbox',
        predefined: 'all',
        sort: undefined,
        lastUpdatedStartDate: new Date(1641852302242),
        lastUpdatedEndDate: new Date(1641852302242),
      };

      await packages.getAll(params);

      expect(mockedFetch.mock.calls[0]).toMatchSnapshot();
    });
  });

  describe('getOne', () => {
    it('sends request to the correct URL', async () => {
      await packages.getOne('package1');
      expect(mockedFetch.mock.calls[0]).toMatchSnapshot();
    });
  });

  describe('update', () => {
    it('sends the provided payload as request body', async () => {
      const payload: Requests.UpdatePackageData = {
        name: 'mock package update',
        status: 'ARCHIVED',
      };

      await packages.update('package1', payload);

      expect(mockedFetch.mock.calls[0]).toMatchSnapshot();
    });
  });

  describe('delete', () => {
    it('sends request to the correct URL', async () => {
      await packages.delete('package1');
      expect(mockedFetch.mock.calls[0]).toMatchSnapshot();
    });
  });

  describe('getAuditTrail', () => {
    it('sends request to the correct URL', async () => {
      await packages.getAuditTrail('package1');
      expect(mockedFetch.mock.calls[0]).toMatchSnapshot();
    });
  });

  describe('getEvidenceSummary', () => {
    it('sends request to the correct URL', async () => {
      await packages.getEvidenceSummary('package1');
      expect(mockedFetch.mock.calls[0]).toMatchSnapshot();
    });
  });
});
