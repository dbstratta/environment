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
  /**
   * The name of the environment variable variable to look up.
   */
  envVarName: string;
  /**
   * Helper text describing the variable.
   */
  description?: string;
} & SchemaEntryRequiredInfo<T>;

export type SchemaEntryRequiredInfo<T> =
  | {
      required: true;
    }
  | {
      required: false;
      /**
       * The default value to be used if the env variable is not defined.
       * It will not be parsed or validated.
       */
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
      let message = `${schemaEntry.envVarName} is required but is not set`;

      if (schemaEntry.description) {
        message += `. Variable description: ${schemaEntry.description}`;
      }

      throw new EnvironmentVariableError(message);
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
