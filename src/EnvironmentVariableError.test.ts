import EnvironmentVariableError from './EnvironmentVariableError';

describe('EnvironmentVariableError', () => {
  test('inherits from Error', () => {
    const environmentVariableError = new EnvironmentVariableError('test');

    expect(environmentVariableError).toBeInstanceOf(Error);
  });

  test('instances have a correct name property', () => {
    const environmentVariableError = new EnvironmentVariableError('test');

    const expectedName = 'EnvironmentVariableError';

    expect(environmentVariableError.name).toEqual(expectedName);
  });
});
