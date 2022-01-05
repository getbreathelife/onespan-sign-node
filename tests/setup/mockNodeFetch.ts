import { mocked } from 'jest-mock';
import fetch from 'node-fetch';

jest.mock('node-fetch');

export const mockedFetch = mocked(fetch, true);
