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

    expect(Object.keys(env)).toHaveLength(0);
  });

  test('the env object has the keys specified in the schema', () => {
    const testIntegerDefaultValue = 100;
    const testStringDefaultValue = 'test';

    const env = makeEnv({
      testInteger: {
        parser: parsers.integer,
        required: false,
        defaultValue: testIntegerDefaultValue,
        envVarName: 'ENV_TEST_INTEGER',
      },
      testString: {
        parser: parsers.string,
        required: false,
        defaultValue: testStringDefaultValue,
        envVarName: 'ENV_TEST_STRING',
      },
    });

    expect(typeof env.testString).toBe('string');
    expect(env.testString).toBe(testStringDefaultValue);

    expect(typeof env.testInteger).toBe('number');
    expect(env.testInteger).toBe(testIntegerDefaultValue);
  });

  test('throws if a required env var is not set', () => {
    const processEnv = {};

    expect(() =>
      makeEnv(
        {
          notSet: {
            parser: parsers.string,
            required: true,
            envVarName: 'ENV_VAR_NOT_SET',
          },
        },
        processEnv,
      ),
    ).toThrow();
  });

  test('loads the env object with process.env data', () => {
    const envVarName = 'ENV_TEST';
    const envVarValue = '10';

    const processEnv = { [envVarName]: envVarValue };

    const env = makeEnv(
      {
        test: {
          parser: parsers.integer,
          required: true,
          envVarName,
        },
      },
      processEnv,
    );

    const expectedValue = 10;

    expect(env.test).toBe(expectedValue);
  });

  test('falls back to defaultValue if the env var is not set and is not required', () => {
    const envVarName = 'ENV_TEST';

    const processEnv = { [envVarName]: undefined };

    const defaultValue = 10;

    const env = makeEnv(
      {
        test: {
          parser: parsers.integer,
          required: false,
          defaultValue,
          envVarName,
        },
      },
      processEnv,
    );

    const expectedValue = defaultValue;

    expect(env.test).toBe(expectedValue);
  });

  test('throws if the parser throws', () => {
    const envVarName = 'NOT_A_NUMBER';
    const processEnv = { [envVarName]: 'NaN' };

    expect(() =>
      makeEnv(
        {
          notANumber: {
            parser: parsers.integer,
            required: true,
            envVarName,
          },
        },
        processEnv,
      ),
    ).toThrow();
  });

  test('throws an error with a message containing the variable description if it has been provided', () => {
    const processEnv = {};

    const description = 'this is a description';

    try {
      makeEnv(
        {
          varWithDescription: {
            parser: parsers.string,
            required: true,
            envVarName: 'VAR_WITH_DESCRIPTION',
            description,
          },
        },
        processEnv,
      );
    } catch (error) {
      expect((error as Error).message).toContain(description);
    }
  });

  test('uses process.env if the processEnv argument is not provided', () => {
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
});

const savedProcessEnv: NodeJS.ProcessEnv = process.env;

function mockProcessEnv(mockedProcessEnv: NodeJS.ProcessEnv): void {
  process.env = mockedProcessEnv;
}

function restoreProcessEnv(): void {
  process.env = savedProcessEnv;
}
