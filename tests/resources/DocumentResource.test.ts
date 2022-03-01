import { Readable } from 'node:stream';

import { AccessTokenOwnerConfig, Api, DocumentResource, Requests } from '../../src';
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
  let documents: DocumentResource;

  beforeAll(() => {
    mockFetchHappyPath();
    mockedApi = mockApiHappyPath();
    documents = new DocumentResource(new Api(MOCK_TOKEN_CONFIG, MOCK_API_URL));
  });

  afterAll(() => {
    restoreMockedApi(mockedApi);
    mockedFetch.mockReset();
  });

  afterEach(() => {
    mockedFetch.mockClear();
  });

  describe('create', () => {
    it.each`
      type        | data                        | expectMatcher
      ${'buffer'} | ${Buffer.from('abc1234')}   | ${(data: any) => data}
      ${'stream'} | ${Readable.from('abc1234')} | ${(data: any) => expect.objectContaining({ source: data })}
    `('sends the provided payload and $type as request body', async ({ data, expectMatcher }) => {
      const payload: Requests.CreateDocumentData = {
        name: 'mock document',
      };
      const packageId = 'mockId';

      await documents.create(packageId, payload, { body: data, filename: 'file.pdf' });

      expect(mockedFetch.mock.calls[0][0]).toMatchSnapshot();

      // Had to compare the value this way instead of using a snapshot because the boundary value is different each time
      expect(mockedFetch.mock.calls[0][1]).toEqual({
        headers: {
          accept: 'application/json',
          authorization: expect.stringMatching(/^Bearer/),
          'content-type': expect.stringMatching(/^multipart\/form-data; boundary=.+/),
        },
        method: 'POST',
        body: expect.objectContaining({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          _streams: expect.arrayContaining([
            expect.stringContaining(`Content-Disposition: form-data; name=\"file\"; filename=\"file.pdf\"`),
            expectMatcher(data),
            expect.stringContaining(`Content-Disposition: form-data; name=\"payload\"`),
            JSON.stringify(payload),
          ]),
        }),
      });
    });
  });

  describe('bulkCreate', () => {
    it('converts the parameters into proper request body', async () => {
      const payload: Requests.BulkCreateDocumentData[] = [
        {
          name: 'document 1',
          documentBody: { body: Buffer.from('abc1234'), filename: 'file1.pdf' },
        },
        {
          name: 'document 2',
          documentBody: { body: Readable.from('abc1234'), filename: 'file2.pdf' },
        },
      ];
      const packageId = 'mockId';

      await documents.bulkCreate(packageId, payload);

      expect(mockedFetch.mock.calls[0][0]).toMatchInlineSnapshot(`"http://demo.com/api/packages/mockId/documents"`);

      expect(mockedFetch.mock.calls[0][1]).toEqual({
        headers: {
          accept: 'application/json',
          authorization: expect.stringMatching(/^Bearer/),
          'content-type': expect.stringMatching(/^multipart\/form-data; boundary=.+/),
        },
        method: 'POST',
        body: expect.objectContaining({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          _streams: expect.arrayContaining([
            expect.stringContaining(`Content-Disposition: form-data; name=\"file\"; filename=\"file1.pdf\"`),
            payload[0].documentBody.body,
            expect.stringContaining(`Content-Disposition: form-data; name=\"file\"; filename=\"file2.pdf\"`),
            expect.objectContaining({ source: payload[1].documentBody.body }),
            expect.stringContaining(`Content-Disposition: form-data; name=\"payload\"`),
            JSON.stringify([{ name: 'document 1' }, { name: 'document 2' }]),
          ]),
        }),
      });
    });
  });

  describe('getMetadata', () => {
    it('sends the request to the correct URL', async () => {
      await documents.getMetadata('package-id', 'documentId');

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/packages/package-id/documents/documentId",
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

  describe('getBody', () => {
    it('sends the request to fetch original document correctly', async () => {
      await documents.getBody('package-id', 'documentId', { format: 'original' });

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/packages/package-id/documents/original",
          Object {
            "headers": Object {
              "accept": "application/octet-stream, application/json",
              "authorization": "Bearer mockedToken",
              "content-type": "application/json",
            },
            "method": "GET",
          },
        ]
      `);
    });

    it('sends the request to fetch PDF document correctly', async () => {
      await documents.getBody('package-id', 'documentId', { format: 'pdf', flatten: true });

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/packages/package-id/documents/pdf?flatten=true",
          Object {
            "headers": Object {
              "accept": "application/octet-stream, application/json",
              "authorization": "Bearer mockedToken",
              "content-type": "application/json",
            },
            "method": "GET",
          },
        ]
      `);

      await documents.getBody('package-id', 'documentId', { format: 'pdf', flatten: false });

      expect(mockedFetch.mock.calls[1]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/packages/package-id/documents/pdf?flatten=false",
          Object {
            "headers": Object {
              "accept": "application/octet-stream, application/json",
              "authorization": "Bearer mockedToken",
              "content-type": "application/json",
            },
            "method": "GET",
          },
        ]
      `);

      await documents.getBody('package-id', 'documentId', { format: 'pdf' });

      expect(mockedFetch.mock.calls[2]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/packages/package-id/documents/pdf",
          Object {
            "headers": Object {
              "accept": "application/octet-stream, application/json",
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
