/* eslint-disable max-len */
import type { JestConfigWithTsJest } from 'ts-jest';

const globalConfig: JestConfigWithTsJest = {

  // A path to a module which exports an async function that is triggered once before all test suites
  globalSetup: '<rootDir>/jest/setup/global.ts',

  // A path to a module which exports an async function that is triggered once after all test suites
  // globalTeardown: undefined,

  // A set of global variables that need to be available in all test environments
  // globals: {},
};

export { globalConfig };
