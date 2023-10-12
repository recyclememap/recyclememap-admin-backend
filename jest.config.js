const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.+(ts|js)',
    '**/?(*.)+(test).+(ts|js)',
    '!**/test-data.ts'
  ],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleNameMapper: {
    '^@root(.*)$': '<rootDir>/src$1',
    '^@commons(.*)$': '<rootDir>/src/commons$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@controllers(.*)$': '<rootDir>/src/controllers$1',
    '^@facades(.*)$': '<rootDir>/src/facades$1',
    '^@model(.*)$': '<rootDir>/src/model$1'
  },
  setupFiles: ['<rootDir>/src/configs/tests/setEnvVars.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/configs/tests/jest.setup.ts']
};

module.exports = config;
