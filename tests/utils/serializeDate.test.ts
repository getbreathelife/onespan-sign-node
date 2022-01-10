import { serializeDate } from '../../src/utils/serializeDate';

describe('serializeDate', () => {
  it.each`
    type           | value
    ${'string'}    | ${'test123'}
    ${'undefined'} | ${undefined}
  `('passes $type parameter through untouched', ({ value }) => {
    expect(serializeDate(value)).toBe(value);
  });

  it('returns ISO date string when the parameter is a Date object', () => {
    const date = new Date(1641853087684);
    expect(serializeDate(date)).toEqual(date.toISOString());
  });
});
