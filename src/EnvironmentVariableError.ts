export default class EnvironmentVariableError extends Error {
  public constructor(message: string) {
    super(message);

    this.name = 'EnvironmentVariableError';
  }
}
