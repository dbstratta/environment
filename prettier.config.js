module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: '*.json',
      options: { trailingComma: 'none' },
    },
  ],
};
