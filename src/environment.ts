import EnvironmentVariableError from './EnvironmentVariableError';
import { Parser } from './parsers';

export type Env<TSchema extends Schema> = Readonly<
  { [key in keyof TSchema]: SchemaEntryType<TSchema[key]> }
>;

/**
 * A schema defines the environment variable
 * requirements.
 */
export type Schema = Readonly<{ [name: string]: SchemaEntry }>;

export type SchemaEntry = Readonly<
  {
    parser: Parser;
    envVarName: string;
  } & SchemaEntryRequiredInfo
>;

export type SchemaEntryRequiredInfo = Readonly<
  | {
      required: true;
    }
  | {
      required: false;
      /**
       * The default value of the environment variable.
       */
      defaultEnvVarValue: string;
    }
>;

export type SchemaEntryType<TSchemaEntry extends SchemaEntry> = ReturnType<
  TSchemaEntry['parser']
>;

/**
 * Returns an env object based on a schema.
 */
export function makeEnv<TSchema extends Schema>(schema: TSchema): Env<TSchema> {
  const env = Object.entries(schema).reduce((acc, [key, schemaEntry]) => {
    const value = getValue(key, schemaEntry);

    return { ...acc, [key]: value };
  }, {}) as Env<TSchema>;

  return env;
}

function getValue(key: string, schemaEntry: SchemaEntry): any {
  const serializedValue = getSerializedValue(schemaEntry);
  const value = parseSerializedValue(key, serializedValue, schemaEntry);

  return value;
}

function getSerializedValue(schemaEntry: SchemaEntry): string {
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

function parseSerializedValue(
  key: string,
  serializedValue: string,
  schemaEntry: SchemaEntry,
): any {
  let value: any;

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
