module.exports = {
  '*.json': ['prettier --write', 'git add'],
  '*.{js,jsx}': ['prettier --write', 'git add'],
  '*.{ts,tsx}': ['yarn lint:fix', 'git add'],
};
