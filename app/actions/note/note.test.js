import configureStore from 'redux-mock-store'

// Actions to be tested
import * as noteActions from './index'

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

  describe('updateNotesList', () => {
    test('Dispatches the correct action and payload', () => {
      store.dispatch(noteActions.updateNotesList())
      expect(store.getActions()).toMatchSnapshot()
    })
  })

  describe('setSelectedNoteID', () => {
    test('Dispatches the correct action and payload', () => {
      store.dispatch(noteActions.setSelectedNoteID('a123'))
      expect(store.getActions()).toMatchSnapshot()
    })
  })

  describe('editSelectedNote', () => {
    test('Dispatches the correct action and payload', () => {
      store.dispatch(noteActions.editSelectedNote({
        title: '',
        content: '',
        modified: 1550849863632
      }))
      expect(store.getActions()).toMatchSnapshot()
    })
  })

  describe('updateSelectedNoteRev', () => {
    test('Dispatches the correct action and payload', () => {
      store.dispatch(noteActions.updateSelectedNoteRev('a123'))
      expect(store.getActions()).toMatchSnapshot()
    })
  })

  describe('deleteSelectedNote', () => {
    test('Dispatches the correct action and payload', () => {
      store.dispatch(noteActions.deleteSelectedNote())
      expect(store.getActions()).toMatchSnapshot()
    })
  })
  describe('updateSearchList', () => {
    test('Dispatches the correct action and payload', () => {
      store.dispatch(noteActions.updateSearchList())
      expect(store.getActions()).toMatchSnapshot()
    })
  })
})
