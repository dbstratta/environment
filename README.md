# Env

[![Travis](https://img.shields.io/travis/com/strattadb/env/develop.svg?style=for-the-badge)](https://travis-ci.com/strattadb/env)
[![npm](https://img.shields.io/npm/dm/@strattadb/env.svg?style=for-the-badge)](https://www.npmjs.com/package/@strattadb/env)
[![Codecov](https://img.shields.io/codecov/c/github/strattadb/env/develop.svg?style=for-the-badge)](https://codecov.io/gh/strattadb/env)
[![David](https://img.shields.io/david/strattadb/env.svg?style=for-the-badge)](https://david-dm.org/strattadb/env)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](CONTRIBUTING.md)

Environment variable configuration for Node.js made easy.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
  - [Making environment variables required](#making-environment-variables-required)
- [API](#api)
- [Recipes](#recipes)
  - [Usage with dotenv](#usage-with-dotenv)
  - [Usage with webpack](#usage-with-webpack)
- [Node.js support](#nodejs-support)
- [Maintainers](#maintainers)
- [Related libraries](#related-libraries)
- [License](#license)

## Installation

```bash
yarn add @strattadb/env
```

or

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

console.log(env.environment); // 'development'
console.log(env.port); // '4000'
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

## API

## Recipes

### Usage with [dotenv](https://github.com/motdotla/dotenv)

TODO

### Usage with [webpack](https://github.com/webpack/webpack)

TODO

## Node.js support

Node.js version 8 or higher.

## Maintainers

- [Diego Stratta](https://github.com/strattadb)

## Related libraries

- [Convict](https://github.com/mozilla/node-convict)

## License

[MIT](LICENSE)
