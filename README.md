# env

[![Travis](https://img.shields.io/travis/com/strattadb/env/develop.svg?style=for-the-badge)](https://travis-ci.com/strattadb/env)
[![npm](https://img.shields.io/npm/dm/@strattadb/env.svg?style=for-the-badge)](https://www.npmjs.com/package/@strattadb/env)
[![Codecov](https://img.shields.io/codecov/c/github/strattadb/env/develop.svg?style=for-the-badge)](https://codecov.io/gh/strattadb/env)
[![David](https://img.shields.io/david/strattadb/env.svg?style=for-the-badge)](https://david-dm.org/strattadb/env)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](CONTRIBUTING.md)

Environment variable configuration for Node.js made easy.

## The problem

Every application needs to ensure that some environment variables are
set from the beginning, and checking if the value in `process.env` is undefined
every time is needed gets tedious very fast.

`env` allows applications to ensure required env variables are set and are valid according
to your definition of valid. See the [usage](#usage).

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
yarn add @strattadb/env
```

or with npm:

```bash
npm install --save @strattadb/env
```

## Usage

An example `env.js` file:

```javascript
import { makeEnv, parsers } from '@strattadb/env';

const env = makeEnv({
  environment: {
    parse: parsers.whitelist(['production', 'development']),
    required: true,
    envVarName: 'NODE_ENV',
  },
  port: {
    parse: parsers.port,
    required: false,
    defaultEnvVarValue: '4000',
    envVarName: 'NODE_ENV',
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

import { makeEnv, parsers } from '@strattadb/env';

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
import { makeEnv, parsers } from '@strattadb/env';

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
import { makeEnv, parsers } from '@strattadb/env';

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

## Recipes

### Usage with [Dotenv](https://github.com/motdotla/dotenv)

A common pattern is to load the env variables from a file using dotenv
and then ensuring that the required variables are actually present:

```javascript
const dotenv = require('dotenv');

dotenv.config(); // Loads env variables from `.env` file to `process.env`.

const { makeEnv, parsers } = require('@strattadb/env');

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
