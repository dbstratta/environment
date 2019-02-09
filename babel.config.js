module.exports = api => {
  const babelEnv = api.env();

  const debug = !!process.env.DEBUG;
  const useBuiltIns = false;

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 8,
        },
        debug,
        useBuiltIns,
      },
    ],
    '@babel/preset-typescript',
  ];

  const plugins = ['dynamic-import-node'];

  const ignore = getIgnoredPaths(babelEnv);

  const sourceMaps = babelEnv === 'production' ? true : 'inline';

  return {
    presets,
    plugins,
    ignore,
    sourceMaps,
  };
};

function getIgnoredPaths(babelEnv) {
  const baseIgnorePaths = ['node_modules'];

  if (babelEnv === 'production') {
    return [...baseIgnorePaths, '**/*.spec.ts', '**/*.test.ts', '**/*.d.ts'];
  }

  return baseIgnorePaths;
}
