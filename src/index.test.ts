import * as parsers from './parsers';

import * as environment from '.';

describe('environment', () => {
  test('exports a function `makeEnv`', () => {
    expect(typeof environment.makeEnv).toBe('function');
  });

  test('exports an object `parsers` that contains parsers', () => {
    expect(typeof environment.parsers).toBe('object');

    for (const parser of Object.values(environment.parsers)) {
      expect(typeof parser).toBe('function');
    }
  });

  test('the `parsers` object contains all the parsers', () => {
    for (const [name, parser] of Object.entries(parsers)) {
      expect(environment.parsers).toEqual(
        expect.objectContaining({ [name]: parser }),
      );
    }
  });
});
