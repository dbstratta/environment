module.exports = {
  '*.json': ['prettier --write', 'git add'],
  '*.{js,jsx,ts,tsx}': ['prettier-eslint --write', 'git add'],
};
