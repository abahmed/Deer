import configureStore from 'redux-mock-store'

// Actions to be tested
import * as noteActions from '../../app/actions/note'
import { NOTE_STATUS } from '../../app/constants/noteStatus'

const mockStore = configureStore()
const store = mockStore()

describe('note_actions', () => {
  beforeEach(() => {
    store.clearActions()
  })

  describe('addNewNote', () => {
    test('Dispatches the correct action and payload', () => {
      store.dispatch(noteActions.addNewNote())
      expect(store.getActions()).toMatchSnapshot()
    })
  })

  describe('updateNoteList', () => {
    test('Dispatches the correct action and payload', () => {
      store.dispatch(noteActions.updateNoteList())
      expect(store.getActions()).toMatchSnapshot()
    })
  })

  describe('setActiveNoteIndex', () => {
    test('Dispatches the correct action and payload', () => {
      store.dispatch(noteActions.setActiveNoteIndex(3))
      expect(store.getActions()).toMatchSnapshot()
    })
  })

  describe('updateNoteTitle', () => {
    test('Dispatches the correct action and payload', () => {
      store.dispatch(noteActions.updateNoteTitle('Hello world'))
      expect(store.getActions()).toMatchSnapshot()
    })
  })

  describe('updateActiveNoteState', () => {
    test('Dispatches the correct action and payload', () => {
      store.dispatch(noteActions.updateActiveNoteState({}))
      expect(store.getActions()).toMatchSnapshot()
    })
  })

  describe('updateNoteRev', () => {
    test('Dispatches the correct action and payload', () => {
      store.dispatch(noteActions.updateNoteRev('a123-a123'))
      expect(store.getActions()).toMatchSnapshot()
    })
  })

  describe('setNoteStatus', () => {
    test('Dispatches the correct action and payload', () => {
      store.dispatch(noteActions.setNoteStatus(NOTE_STATUS.SAVING_NOTE))
      expect(store.getActions()).toMatchSnapshot()
    })
  })

  describe('loadNoteContent', () => {
    test('Dispatches the correct action and payload', () => {
      store.dispatch(noteActions.loadNoteContent({}))
      expect(store.getActions()).toMatchSnapshot()
    })
  })

  describe('deleteNoteFromList', () => {
    test('Dispatches the correct action and payload', () => {
      store.dispatch(noteActions.deleteNoteFromList(3))
      expect(store.getActions()).toMatchSnapshot()
    })
  })
})
