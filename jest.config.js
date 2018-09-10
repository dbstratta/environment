module.exports = {
  testEnvironment: 'node',
  collectCoverage: false,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  moduleFileExtensions: ['js', 'ts', 'json'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
  modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/e2e'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
