import type { Config } from 'jest';
import { defaults } from 'jest-config';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-extended/all'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'cypher'],
  globalSetup: './src/jestGlobalSetup.ts',
};

export default config;
