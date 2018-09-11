const changelogFile = 'CHANGELOG.md';
const changelogTitle = '# Changelog';

const gitPluginAssets = ['package.json', 'yarn.lock', changelogFile];

const changelogPlugin = {
  path: '@semantic-release/changelog',
  changelogFile,
  changelogTitle,
};

const npmPlugin = '@semantic-release/npm';

const gitPlugin = {
  path: '@semantic-release/git',
  assets: gitPluginAssets,
};

const githubPlugin = '@semantic-release/github';

module.exports = {
  branch: 'master',
  verifyConditions: [changelogPlugin, npmPlugin, gitPlugin, githubPlugin],
  prepare: [changelogPlugin, npmPlugin, gitPlugin],
};
