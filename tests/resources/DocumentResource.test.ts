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

      expect(mockedFetch.mock.calls[0][0]).toMatchSnapshot();

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
});
