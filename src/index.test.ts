import * as parsers from './parsers';

import * as environment from '.';

describe('environment', () => {
  test('exports a function `makeEnv`', () => {
    expect(typeof environment.makeEnv).toBe('function');
  });

  test('exports an object `parsers` that contains parsers', () => {
    expect(typeof environment.parsers).toBe('object');

    Object.values(environment.parsers).forEach((parser) => {
      expect(typeof parser).toBe('function');
    });
  });

  test('the `parsers` object contains all the parsers', () => {
    Object.entries(parsers).forEach(([name, parser]) => {
      if (typeof parser === 'function') {
        return;
      }

      expect(environment.parsers).toEqual(
        expect.objectContaining({ [name]: parser }),
      );
    });
  });
});
