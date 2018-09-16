import configureStore from 'redux-mock-store'
import { ACTIONS } from '../../app/constants/actions'
import * as modalActions from '../../app/actions/modal'
jest.mock('../../__mocks__/pouchdb-browser')

const mockStore = configureStore()
const store = mockStore()

global.fetch = () => {}

describe('modal_actions', () => {
  beforeEach(() => {
    store.clearActions()
  })

  describe('toggleYesNoModal', () => {
    test('Dispatches the correct action and payload', () => {
      store.dispatch(modalActions.toggleYesNoModal(ACTIONS.SAVE_NOTE))
      expect(store.getActions()).toMatchSnapshot()
    })
  })
})
