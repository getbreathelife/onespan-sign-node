import { Readable } from 'node:stream';

import { Api, DocumentResource, UploadDocumentRequestPayload } from '../../src';
import { mockedFetch, mockFetchHappyPath } from '../setup/mockNodeFetch';

const MOCK_API_KEY = 'demoKey';
const MOCK_API_URL = 'http://demo.com';

describe('DocumentResource', () => {
  let documents: DocumentResource;

  beforeAll(() => {
    mockFetchHappyPath();
    documents = new DocumentResource(new Api(MOCK_API_KEY, MOCK_API_URL));
  });

  afterAll(() => {
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
      const payload: UploadDocumentRequestPayload = {
        name: 'mock document',
      };
      const packageId = 'mockId';

      await documents.create(packageId, payload, data);

      expect(mockedFetch.mock.calls[0][0]).toMatchSnapshot();

      // Had to compare the value this way instead of using a snapshot because the boundary value is different each time
      expect(mockedFetch.mock.calls[0][1]).toEqual({
        headers: {
          accept: 'application/json',
          authorization: `Basic ${MOCK_API_KEY}`,
          'content-type': expect.stringMatching(/^multipart\/form-data; boundary=.+/),
        },
        method: 'POST',
        body: expect.objectContaining({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          _streams: expect.arrayContaining([
            expect.stringContaining(`Content-Disposition: form-data; name=\"file\"; filename=\"${payload.name}\"`),
            expectMatcher(data),
            expect.stringContaining(`Content-Disposition: form-data; name=\"payload\"`),
            JSON.stringify(payload),
          ]),
        }),
      });
    });
  });
});
