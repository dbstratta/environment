// eslint-disable-next-line fp/no-class
export default class EnvironmentVariableError extends Error {
  public constructor(message: string) {
    super(message);

    // eslint-disable-next-line fp/no-this
    this.name = 'EnvironmentVariableError';
  }
}
