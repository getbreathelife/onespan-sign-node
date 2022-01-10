import { mocked } from 'jest-mock';
import fetch, { Response } from 'node-fetch';

jest.mock('node-fetch');

export const mockedFetch = mocked(fetch, true);

export function mockFetchHappyPath(): void {
  mockedFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({}) } as Response);
}
