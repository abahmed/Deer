module.exports = {
  setupTestFrameworkScriptFile: '<rootDir>/__tests__/setup.js',
  testPathIgnorePatterns: ['<rootDir>/__tests__/setup.js'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/__mocks__/fileMock.js'
  }
}
