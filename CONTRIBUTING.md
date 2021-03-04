# Contributing

Thanks for contributing!

## Getting started

1. Clone the repo: `git clone https://github.com/strattadb/environment.git`.
2. Install the dependencies: `yarn install`.

## Committing

We use the conventional commit format.
Please see [their docs](https://www.conventionalcommits.org/en/v1.0.0-beta.3/)
for more information, or use `yarn commit`.

**Note**: when doing a breaking change,
please include `BREAKING CHANGE: <the description of the breaking change>`.
This lets us do a major bump in the version automatically
thanks to [semantic-release](https://github.com/semantic-release/semantic-release).

## Before submitting your change

The CI will reject any PR that doesn't follow the guidelines,
but you can test locally to be confident that your PR will pass CI.

1. Make sure all tests pass. See [the testing section](#running-tests).
2. Make sure the TypeScript types are ok: `yarn tsc`.
3. Make sure the linter doesn't complain: `yarn lint`.
4. Your PR is good to go!

## Running tests

- To run tests once: `yarn test`.
- To run tests in watch mode: `yarn test:watch`.
- To run tests once collecting coverage: `yarn test:coverage`.

## Changelog, versioning and publishing

Keeping the changelog updated, bumping the version of the package
and publishing to npm are automatically done in the CI pipeline when pushing to `master`.
