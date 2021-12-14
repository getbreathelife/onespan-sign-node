module.exports = {
    roots: ['<rootDir>/tests'],
    moduleDirectories: ['<rootDir>', 'node_modules'],
    testMatch: ['**/*.test.[jt]s?(x)'],
    transform: {
        '^.+\\.(ts)x?$': 'ts-jest',
    },
    clearMocks: true,
    testEnvironment: 'node',
};
