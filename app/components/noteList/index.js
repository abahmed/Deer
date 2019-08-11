import { connect } from 'react-redux'
import { compose } from 'redux'
import { withTranslation } from 'react-i18next'

import {
  addToNoteIDs,
  removeFromNoteIDs,
  saveActiveNoteBook,
  addToActiveNoteBook,
  removeFromActiveNoteBook
} from '../../actions/notebook'
import { setSelectedNoteID, removeSelectedNote } from '../../actions/note'
import { setCustomNoteId } from '../../utils/api.electron'
import NoteList from './noteList'

const mapStateToProps = state => {
  const notes = []
  const notesList = state.noteReducer.get('notes')
  const searchNotesList = state.noteReducer.get('searchNotes')
  const noteBookNotes = state.noteBookReducer.get('noteBookNotes')
  const noteBookIsOpened = state.noteBookReducer.get('noteBookIsOpened')
  if (searchNotesList.length > 0 && noteBookIsOpened) {
    searchNotesList.forEach(noteID => {
      if (noteBookNotes[noteID]) {
        const note = notesList[noteID]
        notes.push({
          id: noteID,
          title: note.title,
          modified: note.modified
        })
      }
    })
  } else if (searchNotesList.length > 0) {
    searchNotesList.forEach(noteID => {
      const note = notesList[noteID]
      notes.push({
        id: noteID,
        title: note.title,
        modified: note.modified
      })
    })
  } else if (noteBookIsOpened) {
    for (const noteID in noteBookNotes) {
      const note = notesList[noteID]
      notes.push({
        id: noteID,
        title: note.title,
        modified: note.modified
      })
    }
  } else {
    for (const noteID in notesList) {
      const note = notesList[noteID]
      notes.push({
        id: noteID,
        title: note.title,
        modified: note.modified
      })
    }
  }

  // Sort notes by Date
  notes.sort((a, b) => {
    return new Date(b.modified) - new Date(a.modified)
  })

  return {
    selectedNoteID: state.noteReducer.get('selectedNoteID'),
    notes: notes,
    noteBookNotes: noteBookNotes,
    activeNoteBookID: state.noteBookReducer.get('activeNoteBookID')
  }
}

const mapDispatchToProps = dispatch => ({
  setSelectedNoteID: noteID => dispatch(setSelectedNoteID(noteID)),
  removeSelectedNote: () => dispatch(removeSelectedNote()),
  setCustomStartupNote: noteID => setCustomNoteId(noteID),
  addToNoteIDs: noteID => dispatch(addToNoteIDs(noteID)),
  removeFromNoteIDs: noteID => dispatch(removeFromNoteIDs(noteID)),
  addToActiveNoteBook: noteID => dispatch(addToActiveNoteBook(noteID)),
  removeFromActiveNoteBook: noteID => dispatch(removeFromActiveNoteBook(noteID)),
  saveActiveNoteBook: () => dispatch(saveActiveNoteBook())
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withTranslation()
)(NoteList)
