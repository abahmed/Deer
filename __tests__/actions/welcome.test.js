import configureStore from 'redux-mock-store'

// Actions to be tested
import * as welcomeActions from '../../app/actions/welcome'

const mockStore = configureStore()
const store = mockStore()

describe('welcome_actions', () => {
  beforeEach(() => {
    store.clearActions()
  })

  describe('getNextLang', () => {
    test('Dispatches the correct action and payload', () => {
      store.dispatch(welcomeActions.getNextLang())
      expect(store.getActions()).toMatchSnapshot()
    })
  })

  describe('toggleFade', () => {
    test('Dispatches the correct action and payload', () => {
      store.dispatch(welcomeActions.toggleFade())
      expect(store.getActions()).toMatchSnapshot()
    })
  })
})
