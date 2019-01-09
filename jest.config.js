module.exports = {
  setupTestFrameworkScriptFile: '<rootDir>/setupTest.js',
  testPathIgnorePatterns: ['<rootDir>/setupTest.js'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/__mocks__/fileMock.js'
  }
}
