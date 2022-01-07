import { Response } from 'node-fetch';
import { Readable } from 'stream';

import { OneSpanSign, PackageRequestPayload, UploadDocumentRequestPayload } from '../src';
import { mockedFetch } from './setup/mockNodeFetch';

const MOCK_API_KEY = 'demoKey';
const MOCK_API_URL = 'http://demo.com';

describe('OneSpanSign', () => {
  let oneSpan: OneSpanSign;

  beforeAll(() => {
    mockedFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({}) } as Response);
    oneSpan = new OneSpanSign(MOCK_API_KEY, MOCK_API_URL);
  });

  afterAll(() => {
    mockedFetch.mockReset();
  });

  afterEach(() => {
    mockedFetch.mockClear();
  });

  describe('createPackage', () => {
    it('sends the provided payload as request body', async () => {
      const payload: PackageRequestPayload = {
        name: 'mock package',
      };

      await oneSpan.packages.create(payload);

      expect(mockedFetch.mock.calls[0]).toMatchSnapshot();
    });
  });

  describe('uploadDocument', () => {
    it.each`
      type        | data                        | expectMatcher
      ${'buffer'} | ${Buffer.from('abc1234')}   | ${(data: any) => data}
      ${'stream'} | ${Readable.from('abc1234')} | ${(data: any) => expect.objectContaining({ source: data })}
    `('sends the provided payload and $type as request body', async ({ data, expectMatcher }) => {
      const payload: UploadDocumentRequestPayload = {
        name: 'mock document',
      };
      const packageId = 'mockId';

      await oneSpan.documents.create(packageId, payload, data);

      // Had to compare the values this way instead of using a snapshot because the boundary value is different each time
      expect(mockedFetch.mock.calls[0][0]).toEqual(`${MOCK_API_URL}/api/packages/${packageId}/documents`);
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
