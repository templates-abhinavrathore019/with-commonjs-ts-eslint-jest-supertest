/* eslint-disable max-len */
import type { JestConfigWithTsJest } from 'ts-jest';

const mockConfig: JestConfigWithTsJest = {
  // All imported modules in your tests should be mocked automatically
  // automock: true,

  // Automatically clear mock calls, instances, contexts and results before every test
  // clearMocks: true,

  // Automatically reset mock state before every test
  // resetMocks: false,

  // Automatically restore mock state and implementation before every test
  // restoreMocks: true,

  // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
  // unmockedModulePathPatterns: undefined,
};

export { mockConfig };
