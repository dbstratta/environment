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
        parser: parsers.integer,
        required: false,
        defaultValue: 100,
        envVarName: 'ENV_TEST_INTEGER',
      },
      testString: {
        parser: parsers.string,
        required: false,
        defaultValue: 'test',
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
          parser: parsers.string,
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
        parser: parsers.integer,
        required: true,
        envVarName,
      },
    });

    const expectedValue = 10;
    expect(env.test).toBe(expectedValue);
  });

  test('falls back to defaultValue if the env var is not set and is not required', () => {
    const envVarName = 'ENV_TEST';

    mockProcessEnv({ [envVarName]: undefined });

    const defaultValue = 10;

    const env = makeEnv({
      test: {
        parser: parsers.integer,
        required: false,
        defaultValue,
        envVarName,
      },
    });

    const expectedValue = defaultValue;
    expect(env.test).toBe(expectedValue);
  });

  test('throws if the parser throws', () => {
    const envVarName = 'NOT_A_NUMBER';
    mockProcessEnv({ [envVarName]: 'NaN' });

    expect(() =>
      makeEnv({
        notANumber: {
          parser: parsers.integer,
          required: true,
          envVarName,
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
