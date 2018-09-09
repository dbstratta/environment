import { isEmail, isIP, isPort, isURL } from 'validator';

export type Parser = (serializedValue: string) => any;

export function string(serializedValue: string): string {
  return serializedValue;
}

export function integer(serializedValue: string): number {
  const value = parseInt(serializedValue, 10);

  if (Number.isNaN(value)) {
    throw new Error('value is not a number');
  }

  return value;
}

export function float(serializedValue: string): number {
  const value = parseFloat(serializedValue);

  if (Number.isNaN(value)) {
    throw new Error('value is not a number');
  }

  return value;
}

export function email(serializedValue: string): string {
  const value = serializedValue;

  if (!isEmail(value)) {
    throw new Error('value is not an email');
  }

  return value;
}

export function url(serializedValue: string): string {
  const value = serializedValue;

  if (!isURL(value)) {
    throw new Error('value is not an URL');
  }

  return value;
}

export function ipAddress(serializedValue: string): string {
  const value = serializedValue;

  if (!isIP(value)) {
    throw new Error('value is not an IP address');
  }

  return value;
}

export function port(serializedValue: string): string {
  const value = serializedValue;

  if (!isPort(value)) {
    throw new Error('value is not a port');
  }

  return value;
}

export function whitelist(whitelistedValues: ReadonlyArray<string>): Parser {
  function whitelistParser(serializedValue: string): any {
    const value = serializedValue;

    if (!whitelistedValues.includes(value)) {
      throw new Error('value is not whitelisted');
    }

    return value;
  }

  return whitelistParser;
}

export function positiveInteger(serializedValue: string): number {
  const value = integer(serializedValue);

  if (value <= 0) {
    throw new Error('value is not positive');
  }

  return value;
}

export function nonPositiveInteger(serializedValue: string): number {
  const value = integer(serializedValue);

  if (value > 0) {
    throw new Error('value is positive');
  }

  return value;
}

export function negativeInteger(serializedValue: string): number {
  const value = integer(serializedValue);

  if (value >= 0) {
    throw new Error('value is not negative');
  }

  return value;
}

export function nonNegativeInteger(serializedValue: string): number {
  const value = integer(serializedValue);

  if (value < 0) {
    throw new Error('value is negative');
  }

  return value;
}
