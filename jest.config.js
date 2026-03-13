module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  testPathIgnorePatterns: [
    '/node_modules/',
    '/e2e/',
  ],
};