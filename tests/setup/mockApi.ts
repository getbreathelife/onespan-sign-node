import { Api } from '../../src';

export type MockedApi = jest.SpyInstance[];

export function mockApiHappyPath(): MockedApi {
  return [jest.spyOn(Api.prototype as any, 'getAuthorizationHeader').mockResolvedValue(`Bearer mockedToken`)];
}

export function clearMockedApi(mockedApi: MockedApi): void {
  mockedApi.forEach((mock) => mock.mockClear());
}

export function restoreMockedApi(mockedApi: MockedApi): void {
  mockedApi.forEach((mock) => mock.mockRestore());
}
