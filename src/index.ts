import {
  boolean,
  email,
  float,
  integer,
  ipAddress,
  negativeInteger,
  nonNegativeInteger,
  nonPositiveInteger,
  Parser,
  port,
  positiveInteger,
  string,
  url,
  whitelist,
} from './parsers';

const parsers = {
  string,
  boolean,
  integer,
  float,
  email,
  url,
  ipAddress,
  port,
  whitelist,
  positiveInteger,
  nonPositiveInteger,
  negativeInteger,
  nonNegativeInteger,
};

export { Parser, parsers };
export {
  makeEnv,
  Env,
  Schema,
  SchemaEntry,
  SchemaEntryRequiredInfo,
} from './environment';
export {
  default as EnvironmentVariableError,
} from './EnvironmentVariableError';
