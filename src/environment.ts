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
} & SchemaEntryRequiredInfo;

export type SchemaEntryRequiredInfo =
  | {
      required: true;
    }
  | {
      required: false;
      /**
       * The default value of the environment variable.
       */
      defaultEnvVarValue: string;
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
  const serializedValue = getSerializedValue(schemaEntry);
  const value = parseSerializedValue(key, serializedValue, schemaEntry);

  return value;
}

function getSerializedValue<T>(schemaEntry: SchemaEntry<T>): string {
  const envVarValue = process.env[schemaEntry.envVarName];

  if (envVarValue !== undefined) {
    return envVarValue;
  }

  if (schemaEntry.required) {
    throw new EnvironmentVariableError(
      `${schemaEntry.envVarName} is required but is not set`,
    );
  }

  if (typeof schemaEntry.defaultEnvVarValue !== 'string') {
    throw new TypeError(
      `expected defaultEnvVarValue to be of type \`string\` but received type \`${typeof schemaEntry.defaultEnvVarValue}\``,
    );
  }

  const serializedValue = schemaEntry.defaultEnvVarValue;

  return serializedValue;
}

function parseSerializedValue<T>(
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
