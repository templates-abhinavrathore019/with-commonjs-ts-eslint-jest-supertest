import type { JestConfigWithTsJest } from 'ts-jest';

import { setupConfig } from './configs/setup.config';
import { globalConfig } from './configs/global.config';
import { filesConfig } from './configs/files.config';
import { mockConfig } from './configs/mock-config';
import { testConfig } from './configs/test.config';
import { coverageConfig } from './configs/coverage-config';

const config: JestConfigWithTsJest = {
  ...setupConfig,
  ...globalConfig,
  ...filesConfig,
  ...mockConfig,
  ...testConfig,
  ...coverageConfig,
};

export default config;
