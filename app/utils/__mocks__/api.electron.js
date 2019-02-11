module.exports = {
  getDefaultLanguage: jest.fn(() => 'en'),
  setNotFirstTimeFlag: jest.fn(),
  getLogger: jest.fn(() => ({
    warn: jest.fn()
  }))
}
