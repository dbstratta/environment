module.exports = {
  '*.json': ['prettier --write', 'git add'],
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'git add'],
};
