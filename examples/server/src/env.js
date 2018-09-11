const { makeEnv, parsers } = require('@strattadb/environment');

const env = makeEnv({
  host: {
    parser: parsers.string,
    required: false,
    defaultValue: '0.0.0.0',
    envVarName: 'HOST',
  },
  port: {
    parser: parsers.string,
    required: false,
    defaultValue: '4000',
    envVarName: 'PORT',
  },
});

module.exports = env;
