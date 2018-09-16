import configureStore from 'redux-mock-store'

// Actions to be tested
import * as headerActions from '../../app/actions/header'

const mockStore = configureStore()
const store = mockStore()

describe('header_actions', () => {
  beforeEach(() => {
    store.clearActions()
  })

  describe('setNewNoteDisabled', () => {
    test('Dispatches the correct action and payload', () => {
      store.dispatch(headerActions.setNewNoteDisabled(true))
      expect(store.getActions()).toMatchSnapshot()
    })
  })

  describe('setSaveDisabled', () => {
    test('Dispatches the correct action and payload', () => {
      store.dispatch(headerActions.setSaveDisabled(true))
      expect(store.getActions()).toMatchSnapshot()
    })
  })

  describe('setDeleteDisabled', () => {
    test('Dispatches the correct action and payload', () => {
      store.dispatch(headerActions.setDeleteDisabled(true))
      expect(store.getActions()).toMatchSnapshot()
    })
  })
})
