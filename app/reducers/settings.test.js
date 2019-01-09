
import settingsReducer from './settings'
import { ACTIONS } from '../constants/actions'

jest.mock('../utils/api.electron')

describe('INITIAL_STATE', () => {
  test('is correct', () => {
    const action = { }

    expect(settingsReducer(undefined, action)).toMatchSnapshot()
  })
})

describe('SAVE_SETTINGS', () => {
  test('is correct', () => {
    const action = { type: ACTIONS.SAVE_SETTINGS, payload: true }

    expect(settingsReducer(undefined, action)).toMatchSnapshot()
  })
})

describe('SET_READY_STATUS', () => {
  test('is correct', () => {
    const action = { type: ACTIONS.SET_READY_STATUS }

    expect(settingsReducer(undefined, action)).toMatchSnapshot()
  })
})
