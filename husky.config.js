module.exports = {
  hooks: {
    'commit-msg': 'commitlint --env HUSKY_GIT_PARAMS',
    'pre-commit': 'yarn typecheck && lint-staged',
  },
};
