# environment

[![Azure Pipelines](https://img.shields.io/azure-devops/build/strattadb/0d9c480f-815f-404d-8d52-50af29a893e6/1/develop.svg?style=for-the-badge)](https://dev.azure.com/strattadb/environment/_build?definitionId=1)
[![npm](https://img.shields.io/npm/v/@strattadb/environment.svg?style=for-the-badge)](https://www.npmjs.com/package/@strattadb/environment)
[![Codecov](https://img.shields.io/codecov/c/github/strattadb/environment/develop.svg?style=for-the-badge)](https://codecov.io/gh/strattadb/environment)
[![David](https://img.shields.io/david/strattadb/environment.svg?style=for-the-badge)](https://david-dm.org/strattadb/environment)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](CONTRIBUTING.md)

Environment variable configuration for Node.js made easy.

## The problem

A lot of applications need to ensure that some environment variables are
set from the beginning, and checking if the value in `process.env` is `undefined`
every time is needed gets tedious very fast.

`environment` allows applications to ensure required env variables are set and are valid according
to _your_ definition of valid. See [how to use it](#usage).

## Table of Contents

- [environment](#environment)
  - [The problem](#the-problem)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Examples](#examples)
  - [API](#api)
    - [`makeEnv(schema: Schema, processEnv?: { [key: string]: string | undefined }): Env`](#makeenvschema-schema-processenv--key-string-string--undefined--env)
    - [Parsers](#parsers)
      - [`parsers.string(value: string): string`](#parsersstringvalue-string-string)
      - [`parsers.boolean(value: string): boolean`](#parsersbooleanvalue-string-boolean)
      - [`parsers.integer(value: string): number`](#parsersintegervalue-string-number)
      - [`parsers.float(value: string): number`](#parsersfloatvalue-string-number)
      - [`parsers.email(value: string): string`](#parsersemailvalue-string-string)
      - [`parsers.url(value: string): string`](#parsersurlvalue-string-string)
      - [`parsers.ipAddress(value: string): string`](#parsersipaddressvalue-string-string)
      - [`parsers.port(value: string): number`](#parsersportvalue-string-number)
      - [`parsers.whitelist(whitelistedValues: string[]): Parser<string>`](#parserswhitelistwhitelistedvalues-string-parserstring)
      - [`parsers.regex(pattern: Regex): Parser<string>`](#parsersregexpattern-regex-parserstring)
      - [`parsers.array<T>({ parser: Parser<T>, separator?: string }): Parser<T>`](#parsersarrayt-parser-parsert-separator-string--parsert)
      - [`parsers.positiveInteger(value: string): number`](#parserspositiveintegervalue-string-number)
      - [`parsers.nonPositiveInteger(value: string): number`](#parsersnonpositiveintegervalue-string-number)
      - [`parsers.negativeInteger(value: string): number`](#parsersnegativeintegervalue-string-number)
      - [`parsers.nonNegativeInteger(value: string): number`](#parsersnonnegativeintegervalue-string-number)
  - [Recipes](#recipes)
    - [Making environment variables required](#making-environment-variables-required)
    - [Specifying a default value for when the env variable is not required](#specifying-a-default-value-for-when-the-env-variable-is-not-required)
    - [Providing a custom parser](#providing-a-custom-parser)
    - [Usage with Dotenv](#usage-with-dotenv)
    - [Providing your own processEnv object](#providing-your-own-processenv-object)
  - [FAQ](#faq)
    - [Where should I call `makeEnv` in my application?](#where-should-i-call-makeenv-in-my-application)
    - [Does it support changing env variables dynamically?](#does-it-support-changing-env-variables-dynamically)
    - [Can I use the `debug` module with `environment`?](#can-i-use-the-debug-module-with-environment)
    - [Can I have more than one env object per application?](#can-i-have-more-than-one-env-object-per-application)
  - [Node.js support](#nodejs-support)
  - [Contributing](#contributing)
  - [Maintainers](#maintainers)
  - [Who's using environment](#whos-using-environment)
  - [Related libraries](#related-libraries)
  - [License](#license)

## Installation

With [Yarn](https://yarnpkg.com/):

```bash
yarn add @strattadb/environment
```

or with npm:

```bash
npm install @strattadb/environment
```

## Usage

An example `env.js` file:

```javascript
// env.js

import { makeEnv, parsers } from '@strattadb/environment';

const env = makeEnv({
  nodeEnv: {
    parser: parsers.whitelist(['production', 'development', 'test']),
    required: true,
    envVarName: 'NODE_ENV',
  },
  port: {
    parser: parsers.port,
    required: false,
    defaultValue: 4000,
    envVarName: 'PORT',
  },
});

export default env;
```

Now in a file:

```javascript
// otherFile.js

import env from './env';

console.log(env.nodeEnv); // development
console.log(typeof env.nodeEnv); // string

console.log(env.port); // 4000
console.log(typeof env.port); // number
```

## Examples

- [Simple HTTP server](examples/server)

## API

### `makeEnv(schema: Schema, processEnv?: { [key: string]: string | undefined }): Env`

Ensures required env variables are present and returns an env object.

Supports passing a processEnv object as the second argument.
If it's not passed, it uses `process.env`.
This object will be used to look up the environment variables.

- **Schema**:

  - **\[key: string\]**: `object` - The `key` will be accessible
    in the returning env object.
    - **parser**: `function` - A function that takes a string and can return anything.
      The return value will be accesible in `env[key]`.
      If the argument is not valid, it should throw.
    - **required**: `boolean` - Whether or not the env variable is required.
      If the value `true` and the env variable is not set, it'll throw.
      If the value is `false` it'll look for the env variable in `process.env`,
      if isn't set, it'll use `defaultValue`.
    - **defaultValue**: `any?` - Only valid if `required: false`.
      This is the default value of the env variable if it's not set.
      It won't be parsed or validated.
    - **envVarName**: `string` - The name of the env variable to look up
      (`process.env[envVarName]`).
    - **description**: `string?` - Helper text describing the variable.

- **Env**:

  - **\[key: string\]**: `any` - The keys are the same as the ones in the schema.

### Parsers

#### `parsers.string(value: string): string`

Trivial parser. It doesn't do any validation.

#### `parsers.boolean(value: string): boolean`

Ensures the value is a truthy or falsy value.

Truthy values: `'true'`, `'1'`, `'yes'`, `'on'`.

Falsy values: `'false'`, `'0'`, `'no'`, `'off'`.

#### `parsers.integer(value: string): number`

Ensures the value is an integer.

#### `parsers.float(value: string): number`

Ensures the value is a float.

#### `parsers.email(value: string): string`

Ensures the value is an email.

#### `parsers.url(value: string): string`

Ensures the value is a url.

#### `parsers.ipAddress(value: string): string`

Ensures the value is an IP address.

#### `parsers.port(value: string): number`

Ensures the value is a port.

#### `parsers.whitelist(whitelistedValues: string[]): Parser<string>`

Takes a list of valid values and returns a parser that
ensures the value is in the whitelist.

Example:

```javascript
import { makeEnv, parsers } from '@strattadb/environment';

const env = makeEnv({
  color: {
    parser: parsers.whitelilst(['red', 'blue', 'green']),
    required: true,
    envVarName: 'COLOR',
  },
});
```

#### `parsers.regex(pattern: Regex): Parser<string>`

Takes a regex and returns a parser that
ensures the value matches the pattern.

Example:

```javascript
import { makeEnv, parsers } from '@strattadb/environment';

const env = makeEnv({
  color: {
    parser: parsers.regex(/^green$/),
    required: true,
    envVarName: 'COLOR',
  },
});
```

#### `parsers.array<T>({ parser: Parser<T>, separator?: string }): Parser<T>`

Takes a parser and returns a parser that parses a list of values.
The default value separator is ','.

Example:

```javascript
import { makeEnv, parsers } from '@strattadb/environment';

const env = makeEnv({
  color: {
    parser: parsers.array({ parser: parsers.integer }),
    required: true,
    envVarName: 'FAVORITE_NUMBERS',
  },
});
```

#### `parsers.positiveInteger(value: string): number`

Ensures the value is a positive integer.

#### `parsers.nonPositiveInteger(value: string): number`

Ensures the value is a non-positive integer.

#### `parsers.negativeInteger(value: string): number`

Ensures the value is a negative integer.

#### `parsers.nonNegativeInteger(value: string): number`

Ensures the value is a non-negative integer.

## Recipes

### Making environment variables required

If `required` is `true` and the environment variable isn't set,
it'll throw:

```javascript
// env.js

import { makeEnv, parsers } from '@strattadb/environment';

const env = makeEnv({
  notSet: {
    parser: parsers.string,
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
    parser: parsers.port,
    required: false,
    defaultValue: 4000,
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
    parser: (value) => {
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

### Usage with [Dotenv](https://github.com/motdotla/dotenv)

A common pattern is to load the env variables from a file using dotenv
and then ensuring that the required variables are actually present:

```javascript
const dotenv = require('dotenv');

dotenv.config(); // Loads env variables from `.env` file to `process.env`.

const { makeEnv, parsers } = require('@strattadb/environment');

const env = makeEnv({
  secretToken: {
    parser: parsers.string,
    required: true,
    envVarName: 'SECRET_TOKEN',
  },
});
```

### Providing your own processEnv object

By default, `makeEnv` uses `process.env` to look up and get environment variables,
but you can pass you own processEnv object as the second argument that will
be used instead of `process.env`:

```javascript
import { makeEnv, parsers } from '@strattadb/environment';

const env = makeEnv(
  {
    hello: {
      parser: parsers.string,
      required: true,
      envVarName: 'HELLO',
    },
  },
  {
    HELLO: 'WORLD',
  },
);
```

## FAQ

### Where should I call `makeEnv` in my application?

The best place to create the env object is very early
in your application startup.
Everything before you call `makeEnv` with your schema will
not be guaranteed to have your required env variables.

### Does it support changing env variables dynamically?

No, when you create an env object it will read the value of
`process.env` at that time. After that, if anything makes
changes to `process.env`, it will not be reflected in the
env object.

### Can I use the [`debug`](https://github.com/visionmedia/debug) module with `environment`?

Yes! Set `DEBUG=environment`.

### Can I have more than one env object per application?

Yes! You can have as many env objects as you want!

## Node.js support

Node.js version 10 or higher. Every version of this library
is tested in Node.js 10, 12, 14 and 15.

## Contributing

PRs, feature requests, bug reports, and any kind of contributions are welcome!
See [CONTRIBUTING.md](CONTRIBUTING.md).

## Maintainers

- [Diego Stratta](https://github.com/strattadb)

## Who's using environment

- [origen](https://github.com/origen-chat/api)

## Related libraries

- [Convict](https://github.com/mozilla/node-convict)
- [Envalid](https://github.com/af/envalid)
- [require-environment-variables](https://github.com/bjoshuanoah/require-environment-variables)
- [Dotenv](https://github.com/motdotla/dotenv)

## License

[MIT](LICENSE)
