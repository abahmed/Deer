import configureStore from 'redux-mock-store'

// Actions to be tested
import * as settingsActions from './settings'

const mockStore = configureStore()
const store = mockStore()

describe('settings_actions', () => {
  beforeEach(() => {
    store.clearActions()
  })

  describe('saveSettings', () => {
    test('Dispatches the correct action and payload', () => {
      store.dispatch(settingsActions.saveSettings({ language: 'ar' }))
      expect(store.getActions()).toMatchSnapshot()
    })
  })

  describe('setReadyStatus', () => {
    test('Dispatches the correct action and payload', () => {
      store.dispatch(settingsActions.setReadyStatus())
      expect(store.getActions()).toMatchSnapshot()
    })
  })
})
