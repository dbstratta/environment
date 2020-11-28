/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
module.exports = (api) => {
  return {
    presets: [
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
    ],
    plugins: [],
    ignore: [
      'node_modules',
      api.env('production') && '**/*.spec.ts',
      api.env('production') && '**/*.test.ts',
      api.env('production') && '**/*.d.ts',
    ].filter(Boolean),
    sourceMaps: api.env('production') ? true : 'inline',
  };
};
/* eslint-enable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
