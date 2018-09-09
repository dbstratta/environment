import { isEmail, isInt, isIP, isPort, isURL } from 'validator';

export type Parser<TReturn = any> = (serializedValue: string) => TReturn;

export const string: Parser<string> = serializedValue => serializedValue;

export const integer: Parser<number> = serializedValue => {
  if (!isInt(serializedValue)) {
    throw new Error('value is not an integer');
  }

  const value = Number.parseInt(serializedValue, 10);

  if (Number.isNaN(value)) {
    throw new Error('value is not a number');
  }

  return value;
};

export const float: Parser<number> = serializedValue => {
  const value = Number.parseFloat(serializedValue);

  if (Number.isNaN(value)) {
    throw new Error('value is not a number');
  }

  return value;
};

export const email: Parser<string> = serializedValue => {
  const value = serializedValue;

  if (!isEmail(value)) {
    throw new Error('value is not an email');
  }

  return value;
};

export const url: Parser<string> = serializedValue => {
  const value = serializedValue;

  if (!isURL(value)) {
    throw new Error('value is not an URL');
  }

  return value;
};

export const ipAddress: Parser<string> = serializedValue => {
  const value = serializedValue;

  if (!isIP(value)) {
    throw new Error('value is not an IP address');
  }

  return value;
};

export const port: Parser<string> = serializedValue => {
  const value = serializedValue;

  if (!isPort(value)) {
    throw new Error('value is not a port');
  }

  return value;
};

export function whitelist(
  whitelistedValues: ReadonlyArray<string>,
): Parser<string> {
  const whitelistParser: Parser<string> = serializedValue => {
    const value = serializedValue;

    if (!whitelistedValues.includes(value)) {
      throw new Error('value is not whitelisted');
    }

    return value;
  };

  return whitelistParser;
}

export const positiveInteger: Parser<number> = serializedValue => {
  const value = integer(serializedValue);

  if (value <= 0) {
    throw new Error('value is not positive');
  }

  return value;
};

export const nonPositiveInteger: Parser<number> = serializedValue => {
  const value = integer(serializedValue);

  if (value > 0) {
    throw new Error('value is positive');
  }

  return value;
};

export const negativeInteger: Parser<number> = serializedValue => {
  const value = integer(serializedValue);

  if (value >= 0) {
    throw new Error('value is not negative');
  }

  return value;
};

export const nonNegativeInteger: Parser<number> = serializedValue => {
  const value = integer(serializedValue);

  if (value < 0) {
    throw new Error('value is negative');
  }

  return value;
};
