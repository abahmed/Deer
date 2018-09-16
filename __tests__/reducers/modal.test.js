
import modalReducer from '../../app/reducers/modal'
import { ACTIONS } from '../../app/constants/actions'

describe('INITIAL_STATE', () => {
  test('is correct', () => {
    const action = { }

    expect(modalReducer(undefined, action)).toMatchSnapshot()
  })
})

describe('TOGGLE_SAVE_MODAL', () => {
  test('is correct', () => {
    const action = {
      type: ACTIONS.TOGGLE_SAVE_MODAL,
      payload: ACTIONS.SAVE_NOTE
    }

    expect(modalReducer(undefined, action)).toMatchSnapshot()
  })
})
