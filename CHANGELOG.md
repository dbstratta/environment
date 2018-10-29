# Changelog

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
