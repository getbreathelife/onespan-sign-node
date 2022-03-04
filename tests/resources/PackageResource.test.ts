import { PackageResource, Requests, Api, AccessTokenOwnerConfig } from '../../src';
import { mockApiHappyPath, MockedApi, restoreMockedApi } from '../setup/mockApi';
import { mockedFetch, mockFetchHappyPath } from '../setup/mockNodeFetch';

const MOCK_TOKEN_CONFIG: AccessTokenOwnerConfig = {
  type: 'OWNER',
  clientId: 'clientId',
  secret: 'secret',
};
const MOCK_API_URL = 'http://demo.com';

describe('PackageResource', () => {
  let mockedApi: MockedApi;
  let packages: PackageResource;

  beforeAll(() => {
    mockFetchHappyPath();
    mockedApi = mockApiHappyPath();
    packages = new PackageResource(new Api(MOCK_TOKEN_CONFIG, MOCK_API_URL));
  });

  afterAll(() => {
    restoreMockedApi(mockedApi);
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

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/packages",
          Object {
            "body": "{\\"name\\":\\"mock package\\"}",
            "headers": Object {
              "accept": "application/json",
              "authorization": "Bearer mockedToken",
              "content-type": "application/json",
            },
            "method": "POST",
          },
        ]
      `);
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

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/packages?query=inbox&predefined=all",
          Object {
            "headers": Object {
              "accept": "application/json",
              "authorization": "Bearer mockedToken",
              "content-type": "application/json",
            },
            "method": "GET",
          },
        ]
      `);
    });

    it('does not append any query parameter if no parameter is passed in', async () => {
      await packages.getAll();

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/packages",
          Object {
            "headers": Object {
              "accept": "application/json",
              "authorization": "Bearer mockedToken",
              "content-type": "application/json",
            },
            "method": "GET",
          },
        ]
      `);
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

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/packages?query=inbox&predefined=all&lastUpdatedStartDate=2022-01-10T22%3A05%3A02.242Z&lastUpdatedEndDate=2022-01-10T22%3A05%3A02.242Z",
          Object {
            "headers": Object {
              "accept": "application/json",
              "authorization": "Bearer mockedToken",
              "content-type": "application/json",
            },
            "method": "GET",
          },
        ]
      `);
    });
  });

  describe('getOne', () => {
    it('sends request to the correct URL', async () => {
      await packages.getOne('package1');

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/packages/package1",
          Object {
            "headers": Object {
              "accept": "application/json",
              "authorization": "Bearer mockedToken",
              "content-type": "application/json",
            },
            "method": "GET",
          },
        ]
      `);
    });
  });

  describe('update', () => {
    it('sends the provided payload as request body', async () => {
      const payload: Requests.UpdatePackageData = {
        name: 'mock package update',
        status: 'ARCHIVED',
      };

      await packages.update('package1', payload);

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/packages/package1",
          Object {
            "body": "{\\"name\\":\\"mock package update\\",\\"status\\":\\"ARCHIVED\\"}",
            "headers": Object {
              "accept": "application/json",
              "authorization": "Bearer mockedToken",
              "content-type": "application/json",
            },
            "method": "PUT",
          },
        ]
      `);
    });
  });

  describe('delete', () => {
    it('sends request to the correct URL', async () => {
      await packages.delete('package1');

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/packages/package1",
          Object {
            "headers": Object {
              "accept": "application/json",
              "authorization": "Bearer mockedToken",
              "content-type": "application/json",
            },
            "method": "DELETE",
          },
        ]
      `);
    });
  });

  describe('getAuditTrail', () => {
    it('sends request to the correct URL', async () => {
      await packages.getAuditTrail('package1');

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/packages/package1/audit",
          Object {
            "headers": Object {
              "accept": "application/json",
              "authorization": "Bearer mockedToken",
              "content-type": "application/json",
            },
            "method": "GET",
          },
        ]
      `);
    });
  });

  describe('getEvidenceSummary', () => {
    it('sends request to the correct URL', async () => {
      await packages.getEvidenceSummary('package1');

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/packages/package1/evidence/summary",
          Object {
            "headers": Object {
              "accept": "application/pdf, application/json",
              "authorization": "Bearer mockedToken",
              "content-type": "application/json",
            },
            "method": "GET",
          },
        ]
      `);
    });
  });
});
