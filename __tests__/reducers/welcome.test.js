import welcomeReducer from '../../app/reducers/welcome'
import { ACTIONS } from '../../app/constants/actions'

describe('INITIAL_STATE', () => {
  test('is correct', () => {
    const action = { }

    expect(welcomeReducer(undefined, action)).toMatchSnapshot()
  })
})

describe('GET_NEXT_LANG', () => {
  test('is correct', () => {
    const action = { type: ACTIONS.GET_NEXT_LANG }

    const result = welcomeReducer(undefined, action)
    delete result.langList
    expect(result).toMatchSnapshot()
  })
})

describe('TOGGLE_FADE', () => {
  test('is correct', () => {
    const action = { type: ACTIONS.TOGGLE_FADE }

    const result = welcomeReducer(undefined, action)
    delete result.langList
    expect(result).toMatchSnapshot()
  })
})
