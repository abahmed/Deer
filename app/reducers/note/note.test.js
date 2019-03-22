import noteReducer from './index'
import { ACTIONS } from '../../constants/actions'

describe('INITIAL_STATE', () => {
  test('is correct', () => {
    const action = { }

    const result = noteReducer(undefined, action)
    delete result.activeNoteState
    expect(result).toMatchSnapshot()
  })
})

describe('NOTES_FETCH_SUCCESS', () => {
  test('is correct', () => {
    const notes = [
      {
        doc: {
          _id: '123',
          _rev: '123a',
          title: 'welcome to Deer',
          content: 'welcome to Deer',
          modified: 1550863560352
        }
      }
    ]
    const action = { type: ACTIONS.NOTES_FETCH_SUCCESS, payload: notes }

    const result = noteReducer(undefined, action)
    expect(result).toMatchSnapshot()
  })
})

describe('SET_SELECTED_NOTE_ID', () => {
  test('is correct', () => {
    const action = { type: ACTIONS.SET_SELECTED_NOTE_ID, payload: 'a123' }

    const result = noteReducer(undefined, action)
    expect(result).toMatchSnapshot()
  })
})

describe('ADD_NOTE', () => {
  test('is correct', () => {
    const action = { type: ACTIONS.ADD_NOTE, payload: {
      id: '123',
      rev: '123a',
      title: 'welcome to Deer 2',
      content: 'welcome to Deer 2',
      modified: 1550863560361
    }}

    const result = noteReducer(undefined, action)
    expect(result).toMatchSnapshot()
  })
})

describe('EDIT_SELECTED_NOTE', () => {
  test('is correct', () => {
    const action = { type: ACTIONS.EDIT_SELECTED_NOTE, payload: {
      title: 'welcome to Deer 3',
      content: 'welcome to Deer 3',
      modified: Date.now()
    }}

    const result = noteReducer(undefined, action)
    expect(result).toMatchSnapshot()
  })
})

describe('UPDATE_SELECTED_NOTE_REV', () => {
  test('is correct', () => {
    const action = { type: ACTIONS.UPDATE_SELECTED_NOTE_REV, payload: 'a123-k123' }

    const result = noteReducer(undefined, action)
    expect(result).toMatchSnapshot()
  })
})

describe('DELETE_SELECTED_NOTE', () => {
  test('is correct', () => {
    const action = { type: ACTIONS.DELETE_SELECTED_NOTE }

    const result = noteReducer(undefined, action)
    expect(result).toMatchSnapshot()
  })
})