import EnvironmentVariableError from './EnvironmentVariableError';
import { Parser } from './parsers';

export type Env<T> = { [K in keyof Schema<T>]: T[K] };

/**
 * A schema defines the environment variable
 * requirements.
 */
export type Schema<T> = { [K in keyof T]: SchemaEntry<T[K]> };

export type SchemaEntry<T> = {
  parser: Parser<T>;
  envVarName: string;
} & SchemaEntryRequiredInfo<T>;

export type SchemaEntryRequiredInfo<T> =
  | {
      required: true;
    }
  | {
      required: false;
      defaultValue: T;
    };

/**
 * Returns an env object based on a schema.
 */
export function makeEnv<T extends { [key: string]: any }>(
  schema: Schema<T>,
): Env<T> {
  const env = Object.entries(schema).reduce((acc, [key, schemaEntry]) => {
    const value = getValue(key, schemaEntry as any);

    return { ...acc, [key]: value };
  }, {}) as Env<T>;

  return env;
}

function getValue<T>(key: string, schemaEntry: SchemaEntry<T>): T {
  const envVarValue = process.env[schemaEntry.envVarName];

  if (envVarValue === undefined) {
    if (schemaEntry.required) {
      throw new EnvironmentVariableError(
        `${schemaEntry.envVarName} is required but is not set`,
      );
    }

    return schemaEntry.defaultValue;
  }

  const value = parseEnvVarValue(key, envVarValue, schemaEntry);

  return value;
}

function parseEnvVarValue<T>(
  key: string,
  serializedValue: string,
  schemaEntry: SchemaEntry<T>,
): T {
  let value: T;

  try {
    value = schemaEntry.parser(serializedValue);
  } catch (error) {
    throw new EnvironmentVariableError(
      `${key} has invalid format. Reason: ${
        (error as Error).message
      }. Got: '${serializedValue}'`,
    );
  }

  return value;
}
