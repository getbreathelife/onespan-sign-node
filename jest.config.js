module.exports = {
  roots: ['<rootDir>/tests'],
  moduleDirectories: ['<rootDir>', 'node_modules'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  clearMocks: true,
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./tests/setup/mockNodeFetch.ts'],
};
