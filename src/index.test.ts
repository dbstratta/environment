import * as parsers from './parsers';

import * as environment from '.';

describe('environment', () => {
  test('exports a function `makeEnv`', () => {
    expect(typeof environment.makeEnv).toBe('function');
  });

  test('exports an object `parsers` contain parsers', () => {
    expect(typeof environment.parsers).toBe('object');

    Object.values(environment.parsers).forEach(parser => {
      expect(typeof parser).toBe('function');
    });

    Object.entries(parsers).forEach(([name, parser]) => {
      if (typeof parser === 'function') {
        expect(environment.parsers).toEqual(
          expect.objectContaining({ [name]: parser }),
        );
      }
    });
  });
});
