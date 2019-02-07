import EnvironmentVariableError from './EnvironmentVariableError';
import { Parser } from './parsers';

export type Env<TSchemaData> = {
  [TKey in keyof Schema<TSchemaData>]: TSchemaData[TKey]
};

/**
 * A schema defines the environment variable
 * requirements.
 */
export type Schema<TSchemaData> = {
  [TKey in keyof TSchemaData]: SchemaEntry<TSchemaData[TKey]>
};

export type SchemaEntry<TType> = {
  parser: Parser<TType>;
  /**
   * The name of the environment variable variable to look up.
   */
  envVarName: string;
  /**
   * Helper text describing the variable.
   */
  description?: string;
} & SchemaEntryRequiredInfo<TType>;

export type SchemaEntryRequiredInfo<TType> =
  | {
      required: true;
    }
  | {
      required: false;
      /**
       * The default value to be used if the env variable is not defined.
       * It will not be parsed or validated.
       */
      defaultValue: TType;
    };

/**
 * Returns an env object based on a schema.
 */
export function makeEnv<TSchemaData extends { [key: string]: any }>(
  schema: Schema<TSchemaData>,
): Env<TSchemaData> {
  const env = Object.entries(schema).reduce((acc, [key, schemaEntry]) => {
    const value = getValue(key, schemaEntry as any);

    return { ...acc, [key]: value };
  }, {}) as Env<TSchemaData>;

  return env;
}

function getValue<TType>(key: string, schemaEntry: SchemaEntry<TType>): TType {
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

function parseEnvVarValue<TType>(
  key: string,
  serializedValue: string,
  schemaEntry: SchemaEntry<TType>,
): TType {
  let value: TType;

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
