import { Response } from 'node-fetch';
import { Readable } from 'node:stream';

import { AccessTokenOwnerConfig, Api, SenderResource, Requests } from '../../src';
import { mockApiHappyPath, MockedApi, restoreMockedApi } from '../setup/mockApi';
import { mockedFetch, mockFetchHappyPath } from '../setup/mockNodeFetch';

const MOCK_TOKEN_CONFIG: AccessTokenOwnerConfig = {
  type: 'OWNER',
  clientId: 'clientId',
  secret: 'secret',
};
const MOCK_API_URL = 'http://demo.com';

describe('SenderResource', () => {
  let mockedApi: MockedApi;
  let senders: SenderResource;

  beforeAll(() => {
    mockFetchHappyPath();
    mockedApi = mockApiHappyPath();
    senders = new SenderResource(new Api(MOCK_TOKEN_CONFIG, MOCK_API_URL));
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
      const payload: Requests.CreateSenderData = {
        email: 'sender@email.com',
        name: 'sender',
        firstName: 'sender first name',
        lastName: 'sender last name',
      };

      await senders.create(payload);

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/account/senders",
          Object {
            "body": "{\\"email\\":\\"sender@email.com\\",\\"name\\":\\"sender\\",\\"firstName\\":\\"sender first name\\",\\"lastName\\":\\"sender last name\\"}",
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
      const params: Requests.GetAllSendersParameters = {
        search: 'type',
        from: 10,
        to: 20,
      };

      await senders.getAll(params);

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/account/senders?search=type&from=10&to=20",
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
      await senders.getAll();

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/account/senders",
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
    it('sends the request to the correct URL', async () => {
      await senders.getOne('sender1');

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/account/senders/sender1",
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

  describe('delete', () => {
    it('sends the request to the correct URL', async () => {
      await senders.delete('sender1');

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/account/senders/sender1",
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

  describe('invite', () => {
    it('sends the request to the correct URL', async () => {
      await senders.invite('sender1');

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/account/senders/sender1/invite",
          Object {
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

  describe('getDefaultSignature', () => {
    it('sends the request to the correct URL', async () => {
      mockedFetch.mockResolvedValue({
        ok: true,
        json() {
          return Promise.resolve({
            fileName: 'file-name',
            mediaType: 'image/png',
            content: Buffer.from('abc1234').toString('base64'),
          });
        },
      } as Response);

      const response = await senders.getDefaultSignature('sender1');

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/account/senders/sender1/signature/image",
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

      expect(response.fileName).toStrictEqual('file-name');
      expect(response.mediaType).toStrictEqual('image/png');
      expect(response.content.toString('utf-8')).toStrictEqual('abc1234');
    });
  });

  describe('setDefaultSignature', () => {
    it.each`
      type        | data                        | expectMatcher
      ${'buffer'} | ${Buffer.from('abc1234')}   | ${(data: any) => data}
      ${'stream'} | ${Readable.from('abc1234')} | ${(data: any) => expect.objectContaining({ source: data })}
    `('sends the provided payload and $type as request body', async ({ data, expectMatcher }) => {
      await senders.setDefaultSignature('sender1', data);

      expect(mockedFetch.mock.calls[0][0].toString()).toStrictEqual(
        'http://demo.com/api/account/senders/sender1/signature/image'
      );

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
            expect.stringContaining(`Content-Disposition: form-data; name=\"file\"`),
            expectMatcher(data),
          ]),
        }),
      });
    });
  });

  describe('deleteDefaultSignature', () => {
    it('sends the request to the correct URL', async () => {
      await senders.delete('sender1');

      expect(mockedFetch.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "http://demo.com/api/account/senders/sender1",
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
});
