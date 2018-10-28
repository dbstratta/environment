import { isEmail, isInt, isIP, isPort, isURL } from 'validator';

export type Parser<TReturn = any> = (serializedValue: string) => TReturn;

/**
 * Parses a string.
 */
export const string: Parser<string> = serializedValue => serializedValue;

/**
 * Parses a boolean. parsed values are case insensitive.
 * Truthy values: true, 1, yes.
 * Falsy values: false, 0, no.
 */
export const boolean: Parser<boolean> = serializedValue => {
  const truthyValues = ['true', '1', 'yes'];
  const falsyValues = ['false', '0', 'no'];

  const lowercaseSerializedValue = serializedValue.toLowerCase();

  if (truthyValues.includes(lowercaseSerializedValue)) {
    return true;
  }

  if (falsyValues.includes(lowercaseSerializedValue)) {
    return false;
  }

  const validValuesString = [...truthyValues, ...falsyValues].join(' ');

  throw new Error(`value is not valid. Valid values: ${validValuesString}`);
};

/**
 * Parses an integer.
 */
export const integer: Parser<number> = serializedValue => {
  if (!isInt(serializedValue)) {
    throw new Error('value is not an integer');
  }

  const value = Number.parseInt(serializedValue, 10);

  return value;
};

/**
 * Parses a float.
 */
export const float: Parser<number> = serializedValue => {
  const value = Number.parseFloat(serializedValue);

  if (Number.isNaN(value)) {
    throw new Error('value is not a number');
  }

  return value;
};

/**
 * Parses an email.
 */
export const email: Parser<string> = serializedValue => {
  const value = serializedValue;

  if (!isEmail(value)) {
    throw new Error('value is not an email');
  }

  return value;
};

/**
 * Parses a URL.
 */
export const url: Parser<string> = serializedValue => {
  const value = serializedValue;

  if (!isURL(value)) {
    throw new Error('value is not an URL');
  }

  return value;
};

/**
 * Parses an IP address.
 */
export const ipAddress: Parser<string> = serializedValue => {
  const value = serializedValue;

  if (!isIP(value)) {
    throw new Error('value is not an IP address');
  }

  return value;
};

/**
 * Parses a port number.
 */
export const port: Parser<number> = serializedValue => {
  if (!isPort(serializedValue)) {
    throw new Error('value is not a port');
  }

  const value = Number.parseInt(serializedValue, 10);

  return value;
};

/**
 * Returns a parser that parses a value from
 * a list of whitelisted values.
 */
export function whitelist(
  whitelistedValues: ReadonlyArray<string>,
): Parser<string> {
  const whitelistParser: Parser<string> = serializedValue => {
    const value = serializedValue;

    if (!whitelistedValues.includes(value)) {
      const whitelistedValuesStr = whitelistedValues
        .map(whitelistedValue => `'${whitelistedValue}'`)
        .join(', ');

      throw new Error(
        `value is not whitelisted. Valid values are ${whitelistedValuesStr}`,
      );
    }

    return value;
  };

  return whitelistParser;
}

/**
 * Parses a positive integer.
 */
export const positiveInteger: Parser<number> = serializedValue => {
  const value = integer(serializedValue);

  if (value <= 0) {
    throw new Error('value is not positive');
  }

  return value;
};

/**
 * Parses a non-positive integer.
 */
export const nonPositiveInteger: Parser<number> = serializedValue => {
  const value = integer(serializedValue);

  if (value > 0) {
    throw new Error('value is positive');
  }

  return value;
};

/**
 * Parses a negative integer.
 */
export const negativeInteger: Parser<number> = serializedValue => {
  const value = integer(serializedValue);

  if (value >= 0) {
    throw new Error('value is not negative');
  }

  return value;
};

/**
 * Parses a non-negative integer.
 */
export const nonNegativeInteger: Parser<number> = serializedValue => {
  const value = integer(serializedValue);

  if (value < 0) {
    throw new Error('value is negative');
  }

  return value;
};
