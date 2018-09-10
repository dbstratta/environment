import { makeEnv } from './environment';
import * as parsers from './parsers';

describe('makeEnv', () => {
  beforeEach(() => {
    restoreProcessEnv();
  });

  afterAll(() => {
    restoreProcessEnv();
  });

  test('makes an empty env object if schema is empty', () => {
    const env = makeEnv({});

    expect(Object.keys(env)).toEqual([]);
  });

  test('the env object has the keys specified in the schema', () => {
    const env = makeEnv({
      testInteger: {
        parse: parsers.integer,
        required: false,
        defaultEnvVarValue: '100',
        envVarName: 'ENV_TEST_INTEGER',
      },
      testString: {
        parse: parsers.string,
        required: false,
        defaultEnvVarValue: 'test',
        envVarName: 'ENV_TEST_STRING',
      },
    });

    expect(typeof env.testString).toBe('string');
    expect(env.testString).toBe('test');

    expect(typeof env.testInteger).toBe('number');
    expect(env.testInteger).toBe(100);
  });

  test('throws if a required env var is not set', () => {
    mockProcessEnv({});

    expect(() =>
      makeEnv({
        notSet: {
          parse: parsers.string,
          required: true,
          envVarName: 'ENV_VAR_NOT_SET',
        },
      }),
    ).toThrow();
  });

  test('loads the env object with process.env data', () => {
    const envVarName = 'ENV_TEST';
    const envVarValue = '10';

    mockProcessEnv({ [envVarName]: envVarValue });

    const env = makeEnv({
      test: {
        parse: parsers.integer,
        required: true,
        envVarName,
      },
    });

    const expectedValue = 10;
    expect(env.test).toBe(expectedValue);
  });

  test('falls back to defaultVarEnvValue if the env var is not set and is not required', () => {
    const envVarName = 'ENV_TEST';

    mockProcessEnv({ [envVarName]: undefined });

    const defaultEnvVarValue = '10';

    const env = makeEnv({
      test: {
        parse: parsers.integer,
        required: false,
        defaultEnvVarValue,
        envVarName,
      },
    });

    const expectedValue = 10;
    expect(env.test).toBe(expectedValue);
  });

  test('throws if defaultEnvVarValue is not a string', () => {
    // @ts-ignore
    const defaultEnvVarValue = 10 as string;

    expect(() =>
      makeEnv({
        test: {
          parse: parsers.integer,
          required: false,
          defaultEnvVarValue,
          envVarName: 'ENV_NOT_SET',
        },
      }),
    ).toThrow();
  });
});

const savedProcessEnv: NodeJS.ProcessEnv = { ...process.env };

function mockProcessEnv(mockedProcessEnv: NodeJS.ProcessEnv): void {
  process.env = mockedProcessEnv;
}

function restoreProcessEnv(): void {
  process.env = savedProcessEnv;
}
