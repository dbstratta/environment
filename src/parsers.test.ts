import * as parsers from './parsers';

describe('parsers.string', () => {
  test('parses a string', () => {
    const serializedValue = 'test';
    const expectedValue = serializedValue;

    expect(parsers.string(serializedValue)).toEqual(expectedValue);
  });
});

describe('parsers.integer', () => {
  test('parses an integer', () => {
    const serializedValue = '10';
    const expectedValue = 10;

    expect(parsers.integer(serializedValue)).toEqual(expectedValue);
  });

  test('throws when serialized value is not a number', () => {
    const serializedValue = 'NaN';

    expect(() => parsers.integer(serializedValue)).toThrow();
  });
});
