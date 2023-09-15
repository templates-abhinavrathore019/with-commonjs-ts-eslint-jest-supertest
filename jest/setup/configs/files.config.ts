/* eslint-disable max-len */
import type { JestConfigWithTsJest } from 'ts-jest';

const filesConfig: JestConfigWithTsJest = {

  // An array of directory names to be searched recursively up from the requiring module's location
  // moduleDirectories: [
  //   'node_modules',
  // ],

  // An array of file extensions your modules use
  moduleFileExtensions: [
    'ts',
    'js',
  ],
  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  // modulePathIgnorePatterns: [],

  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',

  // A map from regular expressions to paths to transformers
  // transform: {
  //   '^.+\\.[tj]s?$': [
  //     'ts-jest',
  //     {
  //       tsconfig: '<rootDir>/tsconfig.json',
  //     },
  //   ],
  // },

  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [
    '/node_modules/',
    '\\.pnp\\.[^\\/]+$',
  ],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  // moduleNameMapper: {
  //   '^(\\.{1,2}/.*)\\.js$': '$1',
  // },

  // A path to a custom resolver
  // resolver: 'ts-jest-resolver',

  // extensionsToTreatAsEsm: ['.ts'],

  // Reset the module registry before running each individual test
  // resetModules: false,
};

export { filesConfig };
