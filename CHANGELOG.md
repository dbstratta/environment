# Changelog

## [8.0.1](https://github.com/strattadb/environment/compare/v8.0.0...v8.0.1) (2020-06-06)


### Bug Fixes

* expose parsers.array ([998dbfc](https://github.com/strattadb/environment/commit/998dbfc84853426e0aa72382a5a1314893e36476))

# [8.0.0](https://github.com/strattadb/environment/compare/v7.0.0...v8.0.0) (2020-02-08)


### Bug Fixes

* fix command in pipeline ([56f8825](https://github.com/strattadb/environment/commit/56f8825463a332450b21ead51b319e364f3e4657))
* **deps:** update dependency validator to v11 ([a9148cc](https://github.com/strattadb/environment/commit/a9148cc3d72b82acdd357540b31adfa9894f5b7a))


### chore

* bump versions ([d581646](https://github.com/strattadb/environment/commit/d58164699e7584e650dfe1ecc65ce25242c8e908))


### Features

* improve TS types ([0251002](https://github.com/strattadb/environment/commit/02510021250e293bb927ffa8f9dc0c53ab89e98e))


### BREAKING CHANGES

* Drop support for Node versions 8 and 11.
Bump  peer dependency to version 12.2.0.

# [7.0.0](https://github.com/strattadb/environment/compare/v6.2.0...v7.0.0) (2019-05-20)


### Bug Fixes

* export regex parser and fix whitelist type ([4bba415](https://github.com/strattadb/environment/commit/4bba415))


### BREAKING CHANGES

* drop support for TypeScript versions 3.3 and lower.

# [6.2.0](https://github.com/strattadb/environment/compare/v6.1.0...v6.2.0) (2019-03-01)


### Features

* use `debug` module to help debugging ([14668b1](https://github.com/strattadb/environment/commit/14668b1))

# [6.1.0](https://github.com/strattadb/environment/compare/v6.0.0...v6.1.0) (2019-02-08)


### Features

* support passing your own processEnv object ([259acfd](https://github.com/strattadb/environment/commit/259acfd))

# [6.0.0](https://github.com/strattadb/environment/compare/v5.2.0...v6.0.0) (2019-02-07)


### chore

* drop Node.js < 10 support ([c2475ca](https://github.com/strattadb/environment/commit/c2475ca))


### Features

* add `on` and `off` as truthy and falsy values respectively ([7e8b423](https://github.com/strattadb/environment/commit/7e8b423))


### BREAKING CHANGES

* drop Node.js < 10 support

# [5.2.0](https://github.com/strattadb/environment.git/compare/v5.1.0...v5.2.0) (2018-12-10)


### Features

* add array parser ([fba9591](https://github.com/strattadb/environment.git/commit/fba9591))
* add description field ([71393d5](https://github.com/strattadb/environment.git/commit/71393d5))

# [5.1.0](https://github.com/strattadb/environment.git/compare/v5.0.0...v5.1.0) (2018-10-29)


### Features

* improve type definition for whitelist parser ([2975adf](https://github.com/strattadb/environment.git/commit/2975adf))

# [5.0.0](https://github.com/strattadb/environment.git/compare/v4.1.0...v5.0.0) (2018-10-28)


### Features

* add regex parser ([4858de9](https://github.com/strattadb/environment.git/commit/4858de9))
* return a number in port parser ([55d1524](https://github.com/strattadb/environment.git/commit/55d1524))


### BREAKING CHANGES

* port parser now returns a number instead of a string.

Changelog

# [4.1.0](https://github.com/strattadb/environment/compare/v4.0.0...v4.1.0) (2018-09-11)


### Features

* add boolean parser ([8cc10f5](https://github.com/strattadb/environment/commit/8cc10f5))

# [4.0.0](https://github.com/strattadb/environment/compare/v3.0.0...v4.0.0) (2018-09-11)


### Features

* add `SchemaEntry.defaultValue` ([994c083](https://github.com/strattadb/environment/commit/994c083))
* improve types ([2171cc3](https://github.com/strattadb/environment/commit/2171cc3))


### BREAKING CHANGES

* `SchemaEntry.defaultEnvVarValue` is deleted.
Use `SchemaEntry.defaultValue` instead.

# [3.0.0](https://github.com/strattadb/environment/compare/v2.0.0...v3.0.0) (2018-09-10)


### chore

* rename parse -> parser ([11627ca](https://github.com/strattadb/environment/commit/11627ca))


### BREAKING CHANGES

* rename SchemaEntry.parse to SchemaEntry.parser.
