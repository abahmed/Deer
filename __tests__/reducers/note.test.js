import noteReducer from '../../app/reducers/note'
import { ACTIONS } from '../../app/constants/actions'
import { NOTE_STATUS } from '../../app/constants/noteStatus'

jest.mock('../../__mocks__/uuid/v4')

describe('INITIAL_STATE', () => {
  test('is correct', () => {
    const action = { }

    const result = noteReducer(undefined, action)
    delete result.activeNoteState
    expect(result).toMatchSnapshot()
  })
})

describe('UPDATE_NOTE_LIST', () => {
  test('is correct', () => {
    const notes = [
      {
        doc: {
          _id: '123',
          _rev: '123a',
          title: 'welcome to Deer'
        }
      }
    ]
    const action = { type: ACTIONS.UPDATE_NOTE_LIST, payload: notes }

    const result = noteReducer(undefined, action)
    delete result.activeNoteState
    expect(result).toMatchSnapshot()
  })
})

describe('SET_ACTIVE_NOTE_INDEX', () => {
  test('is correct', () => {
    const action = { type: ACTIONS.SET_ACTIVE_NOTE_INDEX, payload: 3 }

    const result = noteReducer(undefined, action)
    delete result.activeNoteState
    expect(result).toMatchSnapshot()
  })
})

describe('ADD_NOTE', () => {
  test('is correct', () => {
    const action = { type: ACTIONS.ADD_NOTE }

    const result = noteReducer(undefined, action)
    delete result.activeNoteState
    expect(result).toMatchSnapshot()
  })
})

describe('UPDATE_NOTE_TITLE', () => {
  test('is correct', () => {
    const action = { type: ACTIONS.UPDATE_NOTE_TITLE, payload: 'Hello World' }

    const result = noteReducer(undefined, action)
    delete result.activeNoteState
    expect(result).toMatchSnapshot()
  })
})

describe('UPDATE_NOTE_REV', () => {
  test('is correct', () => {
    const action = { type: ACTIONS.UPDATE_NOTE_REV, payload: 'a123-k123' }

    const result = noteReducer(undefined, action)
    delete result.activeNoteState
    expect(result).toMatchSnapshot()
  })
})

describe('UPDATE_ACTIVE_NOTE_STATE', () => {
  test('is correct', () => {
    const action = {
      type: ACTIONS.UPDATE_ACTIVE_NOTE_STATE,
      payload: 'new State'
    }

    const result = noteReducer(undefined, action)
    delete result.activeNoteState
    expect(result).toMatchSnapshot()
  })
})

describe('SET_NOTE_STATUS', () => {
  test('is correct', () => {
    const action = {
      type: ACTIONS.SET_NOTE_STATUS,
      payload: NOTE_STATUS.SAVING_NOTE
    }

    const result = noteReducer(undefined, action)
    delete result.activeNoteState
    expect(result).toMatchSnapshot()
  })
})

describe('DELETE_NOTE_FROM_LIST', () => {
  test('is correct', () => {
    const action = { type: ACTIONS.DELETE_NOTE_FROM_LIST }

    const result = noteReducer(undefined, action)
    delete result.activeNoteState
    expect(result).toMatchSnapshot()
  })
})
