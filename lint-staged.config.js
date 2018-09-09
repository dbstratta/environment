module.exports = {
  '*.json': ['prettier --write', 'git add'],
  '*.{js,jsx}': ['prettier --write', 'git add'],
  '*.{ts,tsx}': ['prettier-tslint fix', 'git add'],
};
