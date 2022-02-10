import { DocumentResource, OneSpanSign, PackageResource } from '../src';

describe('OneSpanSign', () => {
  let oneSpanSign: OneSpanSign;
  let prototype: any;

  beforeAll(() => {
    oneSpanSign = new OneSpanSign(
      {
        type: 'OWNER',
        clientId: 'clientId',
        secret: 'secret',
      },
      'https://demo.com'
    );
    prototype = Object.getPrototypeOf(oneSpanSign);
  });

  describe.each`
    resource       | type
    ${'packages'}  | ${PackageResource}
    ${'documents'} | ${DocumentResource}
  `('$resource resource', ({ resource, type }) => {
    it(`defines ${resource} resource property as getter function on the prototype`, () => {
      expect(Object.getOwnPropertyDescriptor(prototype, resource)).toStrictEqual(
        expect.objectContaining({
          get: expect.any(Function),
        })
      );
    });

    it(`lazily initializes ${resource} resource and shadows the getter function with an object property`, () => {
      expect(Reflect.get(oneSpanSign, resource)).toStrictEqual(expect.any(type));
      expect(Object.getOwnPropertyDescriptor(oneSpanSign, resource)).toStrictEqual(
        expect.objectContaining({
          value: expect.any(type),
        })
      );
    });
  });
});
