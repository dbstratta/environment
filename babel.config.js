/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
module.exports = (api) => {
  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 10,
        },
        debug: !!process.env.DEBUG_BABEL,
        useBuiltIns: false,
        bugfixes: true,
      },
    ],
    '@babel/preset-typescript',
  ];

  const plugins = ['dynamic-import-node'];

  const ignore = getIgnoredPaths(api);

  const sourceMaps = api.env('production') ? true : 'inline';

  return {
    presets,
    plugins,
    ignore,
    sourceMaps,
  };
};

function getIgnoredPaths(api) {
  const baseIgnorePaths = ['node_modules'];

  if (api.env('production')) {
    return [...baseIgnorePaths, '**/*.spec.ts', '**/*.test.ts', '**/*.d.ts'];
  }

  return baseIgnorePaths;
}
/* eslint-enable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
