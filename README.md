# environment

[![Travis](https://img.shields.io/travis/com/strattadb/environment/develop.svg?style=for-the-badge)](https://travis-ci.com/strattadb/environment)
[![npm](https://img.shields.io/npm/dm/@strattadb/environment.svg?style=for-the-badge)](https://www.npmjs.com/package/@strattadb/environment)
[![Codecov](https://img.shields.io/codecov/c/github/strattadb/environment/develop.svg?style=for-the-badge)](https://codecov.io/gh/strattadb/environment)
[![David](https://img.shields.io/david/strattadb/environment.svg?style=for-the-badge)](https://david-dm.org/strattadb/environment)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](CONTRIBUTING.md)

Environment variable configuration for Node.js made easy.

## The problem

Every application needs to ensure that some environment variables are
set from the beginning, and checking if the value in `process.env` is undefined
every time is needed gets tedious very fast.

`environment` allows applications to ensure required env variables are set and are valid according
to your definition of valid. See [how to use it](#usage).

## Table of Contents

- [The problem](#the-problem)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
  - [Making environment variables required](#making-environment-variables-required)
  - [Specifying a default value for when the env variable is not required](#specifying-a-default-value-for-when-the-env-variable-is-not-required)
  - [Providing a custom parser](#providing-a-custom-parser)
- [API](#api)
  - [makeEnv(schema: Schema): Env](#makeenvschema-schema-env)
  - [Parsers](#parsers)
    - [parsers.string(value: string): string](#parsersstringvalue-string-string)
    - [parsers.integer(value: string): number](#parsersintegervalue-string-number)
    - [parsers.float(value: string): float](#parsersfloatvalue-string-float)
    - [parsers.email(value: string): string](#parsersemailvalue-string-string)
    - [parsers.url(value: string): string](#parsersurlvalue-string-string)
    - [parsers.ipAddress(value: string): string](#parsersipaddressvalue-string-string)
    - [parsers.port(value: string): string](#parsersportvalue-string-string)
    - [parsers.whitelist(whitelistedValues: string[]): Parser](#parserswhitelistwhitelistedvalues-string-parser)
    - [parsers.positiveInteger(value: string): number](#parserspositiveintegervalue-string-number)
    - [parsers.nonPositiveInteger(value: string): number](#parsersnonpositiveintegervalue-string-number)
    - [parsers.negativeInteger(value: string): number](#parsersnegativeintegervalue-string-number)
    - [parsers.nonNegativeInteger(value: string): number](#parsersnonnegativeintegervalue-string-number)
- [Recipes](#recipes)
  - [Usage with Dotenv](#usage-with-dotenv)
  - [Usage with webpack](#usage-with-webpack)
- [FAQ](#faq)
  - [Where should I call `makeEnv` in my application?](#where-should-i-call-makeenv-in-my-application)
  - [Does it support changing env variables dynamically?](#does-it-support-changing-env-variables-dynamically)
- [Node.js support](#nodejs-support)
- [Maintainers](#maintainers)
- [Related libraries](#related-libraries)
- [License](#license)

## Installation

With Yarn:

```bash
yarn add @strattadb/environment
```

or with npm:

```bash
npm install --save @strattadb/environment
```

## Usage

An example `env.js` file:

```javascript
import { makeEnv, parsers } from '@strattadb/environment';

const env = makeEnv({
  environment: {
    parse: parsers.whitelist(['production', 'development', 'test']),
    required: true,
    envVarName: 'NODE_ENV',
  },
  port: {
    parse: parsers.port,
    required: false,
    defaultEnvVarValue: '4000',
    envVarName: 'PORT',
  },
});

export default env;
```

Now in a file:

```javascript
import env from './env';

console.log(env.environment); // development
console.log(env.port); // 4000
```

## Examples

### Making environment variables required

If `required` is `true` and the environment variable isn't set,
it'll throw:

```javascript
// env.js

import { makeEnv, parsers } from '@strattadb/environment';

const env = makeEnv({
  notSet: {
    parse: parsers.string,
    required: true,
    envVarName: 'NOT_SET',
  },
});
```

```bash
node env.js

EnvironmentVariableError: NOT_SET is required but is not set
    at ...
    ...
```

### Specifying a default value for when the env variable is not required

If the env variable is not required you must specify a default value:

```javascript
import { makeEnv, parsers } from '@strattadb/environment';

const env = makeEnv({
  port: {
    parse: parsers.port,
    required: false,
    defaultEnvVarValue: '4000',
    envVarName: 'PORT',
  },
});

console.log(env.port); // 4000
```

### Providing a custom parser

A parser function must take a string value and can return anything.
The value you return is what you'll get in the env object.
If the value is not valid you should throw an error:

```javascript
import { makeEnv, parsers } from '@strattadb/environment';

const env = makeEnv({
  someValue: {
    parse: value => {
      if (value === 'forbiddenValue') {
        throw new Error('value is forbidden');
      }

      return value;
    },
    required: true,
    envVarName: 'SOME_VALUE',
  },
});
```

## API

### makeEnv(schema: Schema): Env

Ensures required env variables are present and returns an env object.

- **Schema**:

  - **\[key: string\]**: `object` - The `key` will be accessible
    in the returning env object.
    - **parse**: `function` - A function that takes a string and can return anything.
      The return value will be accesible in `env[key]`.
      If the argument is not valid, it should throw.
    - **required**: `boolean` - Whether or not the env variable is required.
      If the value `true` and the env variable is not set, it'll throw.
      If the value is `false` it'll look for the env variable in `process.env`,
      if isn't set, it'll use `defaultEnvVarValue`.
    - **defaultEnvVarValue**: `string` - Only valid if `required: false`.
      This is the default value of the env variable if it's not set.
      It will be parsed by the function in `parse`.
    - **envVarName**: `string` - The name of the env variable to look up
      (`process.env[envVarName]`).

- **Env**:

  - **\[key: string\]**: `any` - The keys are the same as the ones in the schema.

### Parsers

#### parsers.string(value: string): string

Trivial parser. It doesn't do any validation.

#### parsers.integer(value: string): number

Ensures the value is an integer.

#### parsers.float(value: string): float

Ensures the value is a float.

#### parsers.email(value: string): string

Ensures the value is an email.

#### parsers.url(value: string): string

Ensures the value is a url.

#### parsers.ipAddress(value: string): string

Ensures the value is an IP address.

#### parsers.port(value: string): string

Ensures the value is a port.

#### parsers.whitelist(whitelistedValues: string[]): Parser

Takes a list of valid values and returns a parser that
ensures the value is in the whitelist.

Example:

```javascript
const env = makeEnv({
  color: {
    parse: parsers.whitelilst(['red', 'blue', 'green']),
    required: true,
    envVarName: 'COLOR',
  },
});
```

#### parsers.positiveInteger(value: string): number

Ensures the value is a positive integer.

#### parsers.nonPositiveInteger(value: string): number

Ensures the value is a non-positive integer.

#### parsers.negativeInteger(value: string): number

Ensures the value is a negative integer.

#### parsers.nonNegativeInteger(value: string): number

Ensures the value is a non-negative integer.

## Recipes

### Usage with [Dotenv](https://github.com/motdotla/dotenv)

A common pattern is to load the env variables from a file using dotenv
and then ensuring that the required variables are actually present:

```javascript
const dotenv = require('dotenv');

dotenv.config(); // Loads env variables from `.env` file to `process.env`.

const { makeEnv, parsers } = require('@strattadb/environment');

const env = makeEnv({
  secretToken: {
    parse: parsers.string,
    required: true,
    envVarName: 'SECRET_TOKEN',
  },
});
```

### Usage with [webpack](https://github.com/webpack/webpack)

TODO

## FAQ

### Where should I call `makeEnv` in my application?

The best place to create the env object is very early
in your application startup.
Everything before you call `makeEnv` with your schema will
not be guaranteed to have your required env variables.

### Does it support changing env variables dynamically?

No, when you create an env object it will read the value of
`process.env` at that time. After that, if anything makes
changes to `process.env` it will not be reflected in the
env object.

## Node.js support

Node.js version 8 or higher.

## Maintainers

- [Diego Stratta](https://github.com/strattadb)

## Related libraries

- [Convict](https://github.com/mozilla/node-convict)
- [Dotenv](https://github.com/motdotla/dotenv)

## License

[MIT](LICENSE)
