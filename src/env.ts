import EnvironmentVariableError from './EnvironmentVariableError';
import { Parser } from './parsers';

export type Env<TSchema extends Schema> = Readonly<
  { [key in keyof TSchema]: SchemaEntryType<TSchema[key]> }
>;

export type Schema = Readonly<{ [name: string]: SchemaEntry }>;

export type SchemaEntry = Readonly<
  {
    parse: Parser;
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
  TSchemaEntry['parse']
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
  const envVarValue = process.env[schemaEntry.envVarName];

  let serializedValue: string;

  if (envVarValue === undefined) {
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

    serializedValue = schemaEntry.defaultEnvVarValue;
  } else {
    serializedValue = envVarValue;
  }

  let value: any;
  try {
    value = schemaEntry.parse(serializedValue);
  } catch (error) {
    throw new EnvironmentVariableError(
      `${key} has invalid format. Reason: ${
        (error as Error).message
      }. Got: '${serializedValue}'`,
    );
  }

  return value;
}
