module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  overrides: [
    {
      files: '*.json',
      options: { trailingComma: 'none' },
    },
  ],
};
