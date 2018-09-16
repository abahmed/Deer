
import headerReducer from '../../app/reducers/header'
import { ACTIONS } from '../../app/constants/actions'

describe('INITIAL_STATE', () => {
  test('is correct', () => {
    const action = { }

    expect(headerReducer(undefined, action)).toMatchSnapshot()
  })
})

describe('UPDATE_NEW_NOTE_STATE', () => {
  test('is correct', () => {
    const action = { type: ACTIONS.UPDATE_NEW_NOTE_STATE, payload: true }

    expect(headerReducer(undefined, action)).toMatchSnapshot()
  })
})

describe('UPDATE_SAVE_NOTE_STATE', () => {
  test('is correct', () => {
    const action = { type: ACTIONS.UPDATE_SAVE_NOTE_STATE, payload: false }

    expect(headerReducer(undefined, action)).toMatchSnapshot()
  })
})

describe('UPDATE_DELETE_NOTE_STATE', () => {
  test('is correct', () => {
    const action = { type: ACTIONS.UPDATE_DELETE_NOTE_STATE, payload: false }

    expect(headerReducer(undefined, action)).toMatchSnapshot()
  })
})
