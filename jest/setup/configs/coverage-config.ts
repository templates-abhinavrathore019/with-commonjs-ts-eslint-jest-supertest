/* eslint-disable max-len */
import type { JestConfigWithTsJest } from 'ts-jest';

const coverageConfig: JestConfigWithTsJest = {
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    '<rootDir>/src/**',
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: './jest/coverage',

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],

  // Indicates which provider should be used to instrument code for coverage
  // coverageProvider: "babel",

  // A list of reporter names that Jest uses when writing coverage reports
  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],

  // An object that configures minimum threshold enforcement for coverage results
  // coverageThreshold: {
  //   global: {
  //     branches: 50,
  //     functions: 50,
  //     lines: 50,
  //     statements: 50,
  //   },
  //   './src/components/': {
  //     branches: 40,
  //     statements: 40,
  //   },
  //   './src/reducers/**/*.js': {
  //     statements: 90,
  //   },
  //   './src/api/very-important-module.js': {
  //     branches: 100,
  //     functions: 100,
  //     lines: 100,
  //     statements: 100,
  //   },
  // },

  // Force coverage collection from ignored files using an array of glob patterns
  // forceCoverageMatch: [],
};

export { coverageConfig };
