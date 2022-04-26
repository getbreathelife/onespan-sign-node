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

      expect(mockedFetch.mock.calls[0][0].toString()).toStrictEqual('http://demo.com/api/packages/mockId/documents');

      // Had to compare the value this way instead of using a snapshot because the boundary value is different each time
      expect(mockedFetch.mock.calls[0][1]).toEqual({
        headers: {
          accept: expect.stringMatching(/^application\/json; esl-api-version=.+/),
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
          accept: expect.stringMatching(/^application\/json; esl-api-version=.+/),
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

  describe('getBody', () => {
    it('sends the request to fetch original document correctly', async () => {
      await documents.getBody('package-id', 'documentId', { format: 'original' });

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/packages/package-id/documents/original",
          Object {
            "headers": Object {
              "accept": "application/octet-stream; esl-api-version=11.46",
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
              "accept": "application/octet-stream; esl-api-version=11.46",
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
              "accept": "application/octet-stream; esl-api-version=11.46",
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
              "accept": "application/octet-stream; esl-api-version=11.46",
              "authorization": "Bearer mockedToken",
              "content-type": "application/json",
            },
            "method": "GET",
          },
        ]
      `);
    });
  });

  describe('getPage', () => {
    it('sends the request to the correct URL', async () => {
      await documents.getPage('package-id', 'documentId', 0);

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/packagespackage-id/documents/documentId/pages/0",
          Object {
            "headers": Object {
              "accept": "image/png; esl-api-version=11.46",
              "authorization": "Bearer mockedToken",
              "content-type": "application/json",
            },
            "method": "GET",
          },
        ]
      `);
    });
  });

  describe('getZipped', () => {
    it('sends the request to the correct URL', async () => {
      await documents.getZipped('package-id');

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/packages/package-id/documents/zip",
          Object {
            "headers": Object {
              "accept": "application/zip; esl-api-version=11.46",
              "authorization": "Bearer mockedToken",
              "content-type": "application/json",
            },
            "method": "GET",
          },
        ]
      `);

      await documents.getZipped('package-id', true);

      expect(mockedFetch.mock.calls[1]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/packages/package-id/documents/zip?flatten=true",
          Object {
            "headers": Object {
              "accept": "application/zip; esl-api-version=11.46",
              "authorization": "Bearer mockedToken",
              "content-type": "application/json",
            },
            "method": "GET",
          },
        ]
      `);

      await documents.getZipped('package-id', false);

      expect(mockedFetch.mock.calls[2]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/packages/package-id/documents/zip?flatten=false",
          Object {
            "headers": Object {
              "accept": "application/zip; esl-api-version=11.46",
              "authorization": "Bearer mockedToken",
              "content-type": "application/json",
            },
            "method": "GET",
          },
        ]
      `);
    });
  });

  describe('getVisibilityInfo', () => {
    it('sends the request to the correct URL', async () => {
      await documents.getVisibilityInfo('package-id');

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/packages/package-id/documents/visibility",
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

  describe('update', () => {
    it('sends the request body in JSON format if no documentBody is provided', async () => {
      await documents.update('package-id', 'documentId', {
        name: 'new document name',
        description: 'Updated description',
      });

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/packages/package-id/documents/documentId",
          Object {
            "body": "{\\"name\\":\\"new document name\\",\\"description\\":\\"Updated description\\"}",
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

    it.each`
      type        | data                        | expectMatcher
      ${'buffer'} | ${Buffer.from('abc1234')}   | ${(data: any) => data}
      ${'stream'} | ${Readable.from('abc1234')} | ${(data: any) => expect.objectContaining({ source: data })}
    `(
      'sends the request body in form-data format if $type is provided as documentBody',
      async ({ data, expectMatcher }) => {
        const payload = {
          name: 'new document name',
          description: 'Updated description',
        };

        const packageId = 'package-id';
        const documentId = 'documentId';

        await documents.update(packageId, documentId, payload, { body: data, filename: 'updatedFile.pdf' });

        expect(mockedFetch.mock.calls[0][0].toString()).toStrictEqual(
          'http://demo.com/api/packages/package-id/documents/documentId'
        );

        expect(mockedFetch.mock.calls[0][1]).toEqual({
          headers: {
            accept: expect.stringMatching(/^application\/json; esl-api-version=.+/),
            authorization: expect.stringMatching(/^Bearer/),
            'content-type': expect.stringMatching(/^multipart\/form-data; boundary=.+/),
          },
          method: 'POST',
          body: expect.objectContaining({
            // eslint-disable-next-line @typescript-eslint/naming-convention
            _streams: expect.arrayContaining([
              expect.stringContaining(`Content-Disposition: form-data; name=\"file\"; filename=\"updatedFile.pdf\"`),
              expectMatcher(data),
              expect.stringContaining(`Content-Disposition: form-data; name=\"payload\"`),
              JSON.stringify(payload),
            ]),
          }),
        });
      }
    );
  });

  describe('updateVisibilityInfo', () => {
    it('sends the request to the correct URL', async () => {
      await documents.updateVisibilityInfo('package-id', {
        configurations: [
          {
            documentUid: 'document-1',
            roleUids: ['owner', 'payor'],
          },
        ],
      });

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/packages/package-id/documents/visibility",
          Object {
            "body": "{\\"configurations\\":[{\\"documentUid\\":\\"document-1\\",\\"roleUids\\":[\\"owner\\",\\"payor\\"]}]}",
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

  describe('delete', () => {
    it('sends the request to the correct URL', async () => {
      await documents.delete('package-id', 'documentId');

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/packages/package-id/documents/documentId",
          Object {
            "headers": Object {
              "accept": "application/json; esl-api-version=11.46",
              "authorization": "Bearer mockedToken",
              "content-type": "application/json",
            },
            "method": "DELETE",
          },
        ]
      `);
    });
  });

  describe('bulkDelete', () => {
    it('sends the request to the correct URL', async () => {
      await documents.bulkDelete('package-id', ['document1', 'document2']);

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/packages/package-id/documents",
          Object {
            "body": "[\\"document1\\",\\"document2\\"]",
            "headers": Object {
              "accept": "application/json; esl-api-version=11.46",
              "authorization": "Bearer mockedToken",
              "content-type": "application/json",
            },
            "method": "DELETE",
          },
        ]
      `);
    });
  });
});
