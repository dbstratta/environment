module.exports = {
  branch: 'master',
  prepare: [
    '@semantic-release/npm',
    {
      path: '@semantic-release/git',
      assets: ['package.json', 'yarn.lock', 'CHANGELOG.md'],
    },
  ],
};
