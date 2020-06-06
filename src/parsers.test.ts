import * as parsers from './parsers';

describe('parsers.string', () => {
  test('parses a string', () => {
    const serializedValue = 'test';
    const expectedValue = serializedValue;

    expect(parsers.string(serializedValue)).toEqual(expectedValue);
  });
});

describe('parsers.boolean', () => {
  test('parses a truthy value', () => {
    const serializedTruthyValues = ['true', '1', 'yes', 'on'];
    const expectedValue = true;

    serializedTruthyValues.forEach((serializedTruthyValue) => {
      expect(parsers.boolean(serializedTruthyValue)).toEqual(expectedValue);
    });
  });

  test('parses a falsy value', () => {
    const serializedFalsyValues = ['false', '0', 'no', 'off'];
    const expectedValue = false;

    serializedFalsyValues.forEach((serializedFalsyValue) => {
      expect(parsers.boolean(serializedFalsyValue)).toEqual(expectedValue);
    });
  });

  test('throws when serialized value is not valid', () => {
    const serializedValue = 'invalid';

    expect(() => parsers.boolean(serializedValue)).toThrow();
  });
});

describe('parsers.integer', () => {
  test('parses an integer', () => {
    const serializedValue = '10';
    const expectedValue = 10;

    expect(parsers.integer(serializedValue)).toEqual(expectedValue);
  });

  test('throws when serialized value is not an integer', () => {
    const serializedValue = '10.2';

    expect(() => parsers.integer(serializedValue)).toThrow();
  });

  test('throws when serialized value is not a number', () => {
    const serializedValue = 'NaN';

    expect(() => parsers.integer(serializedValue)).toThrow();
  });
});

describe('parsers.float', () => {
  test('parses a float', () => {
    const serializedValue = '10.2';
    const expectedValue = 10.2;

    expect(parsers.float(serializedValue)).toEqual(expectedValue);
  });

  test('throws when serialized value is not a number', () => {
    const serializedValue = 'NaN';

    expect(() => parsers.float(serializedValue)).toThrow();
  });
});

describe('parsers.email', () => {
  test('parses an email', () => {
    const serializedValue = 'example@example.com';
    const expectedValue = serializedValue;

    expect(parsers.email(serializedValue)).toEqual(expectedValue);
  });

  test('throws when serialized value is not an email', () => {
    const serializedValue = 'not_an_email';

    expect(() => parsers.email(serializedValue)).toThrow();
  });
});

describe('parsers.url', () => {
  test('parses a url', () => {
    const serializedValue = 'https://example.com';
    const expectedValue = serializedValue;

    expect(parsers.url(serializedValue)).toEqual(expectedValue);
  });

  test('throws when serialized value is not an email', () => {
    const serializedValue = 'not_an_email';

    expect(() => parsers.url(serializedValue)).toThrow();
  });
});

describe('parsers.ipAddress', () => {
  test('parses an IP address', () => {
    const serializedValue = '0.0.0.0';
    const expectedValue = serializedValue;

    expect(parsers.ipAddress(serializedValue)).toEqual(expectedValue);
  });

  test('throws when serialized value is not an IP address', () => {
    const serializedValue = 'not_an_ip_address';

    expect(() => parsers.ipAddress(serializedValue)).toThrow();
  });
});

describe('parsers.port', () => {
  test('parses a port', () => {
    const serializedValue = '4000';
    const expectedValue = 4000;

    expect(parsers.port(serializedValue)).toEqual(expectedValue);
  });

  test('throws when serialized value is not a port', () => {
    const serializedValue = 'not_a_port';

    expect(() => parsers.port(serializedValue)).toThrow();
  });
});

describe('parsers.whitelist', () => {
  test('parses a whitelisted value', () => {
    const serializedValue = 'production';
    const expectedValue = serializedValue;
    const whitelistedValues = [serializedValue, 'development'];

    const parser = parsers.whitelist(whitelistedValues);

    expect(parser(serializedValue)).toEqual(expectedValue);
  });

  test('throws when serialized value is not in whitelisted values', () => {
    const serializedValue = 'production';
    const whitelistedValues = ['staging', 'development'];

    const parser = parsers.whitelist(whitelistedValues);

    expect(() => parser(serializedValue)).toThrow();
  });
});

describe('parsers.regex', () => {
  test('parses a value matching the pattern', () => {
    const serializedValue = 'validValue12';
    const expectedValue = serializedValue;

    const pattern = /^valid.*\d+$/;

    const parser = parsers.regex(pattern);

    expect(parser(serializedValue)).toEqual(expectedValue);
  });

  test("throws when serialized value doesn't match the pattern", () => {
    const serializedValue = 'invalidValue_1';

    const pattern = /^valid.*\d+$/;

    const parser = parsers.regex(pattern);

    expect(() => parser(serializedValue)).toThrow();
  });
});

describe('parsers.array', () => {
  test('parses an array of values', () => {
    const values = ['test1', 'test2', 'test3'];

    const serializedValue = values.join(',');
    const expectedValue = values;

    const parser = parsers.array({ parser: parsers.string });

    expect(parser(serializedValue)).toEqual(expectedValue);
  });

  test('parses an array of values with custom separator', () => {
    const separator = ':';
    const values = ['test1', 'test2', 'test3'];

    const serializedValue = values.join(separator);
    const expectedValue = values;

    const parser = parsers.array({ parser: parsers.string, separator });

    expect(parser(serializedValue)).toEqual(expectedValue);
  });

  test("throws when the value parser can't parse a value", () => {
    const values = ['test1', 'test2', 'test3'];

    const serializedValue = values.join(',');

    const parser = parsers.array({ parser: parsers.integer });

    expect(() => parser(serializedValue)).toThrow();
  });
});

describe('parsers.positiveInteger', () => {
  test('parses a positive integer', () => {
    const serializedValue = '2';
    const expectedValue = 2;

    expect(parsers.positiveInteger(serializedValue)).toEqual(expectedValue);
  });

  test('throws when serialized value is not a number', () => {
    const serializedValue = 'NaN';

    expect(() => parsers.positiveInteger(serializedValue)).toThrow();
  });

  test('throws when serialized value is not a positive integer', () => {
    const serializedValue = '0';

    expect(() => parsers.positiveInteger(serializedValue)).toThrow();
  });
});

describe('parsers.nonPositiveInteger', () => {
  test('parses a non positive integer', () => {
    const serializedValue = '-10';
    const expectedValue = -10;

    expect(parsers.nonPositiveInteger(serializedValue)).toEqual(expectedValue);
  });

  test('throws when serialized value is not a number', () => {
    const serializedValue = 'NaN';

    expect(() => parsers.nonPositiveInteger(serializedValue)).toThrow();
  });

  test('throws when serialized value is a positive integer', () => {
    const serializedValue = '10';

    expect(() => parsers.nonPositiveInteger(serializedValue)).toThrow();
  });
});

describe('parsers.negativeInteger', () => {
  test('parses a negative integer', () => {
    const serializedValue = '-10';
    const expectedValue = -10;

    expect(parsers.negativeInteger(serializedValue)).toEqual(expectedValue);
  });

  test('throws when serialized value is not a number', () => {
    const serializedValue = 'NaN';

    expect(() => parsers.negativeInteger(serializedValue)).toThrow();
  });

  test('throws when serialized value is not a negative integer', () => {
    const serializedValue = '10';

    expect(() => parsers.negativeInteger(serializedValue)).toThrow();
  });
});

describe('parsers.nonNegativeInteger', () => {
  test('parses a non negative integer', () => {
    const serializedValue = '0';
    const expectedValue = 0;

    expect(parsers.nonNegativeInteger(serializedValue)).toEqual(expectedValue);
  });

  test('throws when serialized value is not a number', () => {
    const serializedValue = 'NaN';

    expect(() => parsers.nonNegativeInteger(serializedValue)).toThrow();
  });

  test('throws when serialized value is not a negative integer', () => {
    const serializedValue = '-10';

    expect(() => parsers.nonNegativeInteger(serializedValue)).toThrow();
  });
});
