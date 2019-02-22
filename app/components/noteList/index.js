import { connect } from 'react-redux'
import { compose } from 'redux'
import { withTranslation } from 'react-i18next'

import { setSelectedNoteID, removeSelectedNote } from '../../actions/note'
import NoteList from './noteList'

const mapStateToProps = state => {
  let notes = []
  const notesList = state.noteReducer.get('notes')
  for (const noteID in notesList) {
    const note = notesList[noteID]
    notes.push({
      id: noteID,
      title: note.title,
      modified: note.modified
    })
  }

  // Sort notes by Date
  notes.sort((a, b) => {
    return new Date(b.modified) - new Date(a.modified)
  })

  return {
    selectedNoteID: state.noteReducer.get('selectedNoteID'),
    notes: notes
  }
}

const mapDispatchToProps = dispatch => ({
  setSelectedNoteID: (noteID) => dispatch(setSelectedNoteID(noteID)),
  removeSelectedNote: () => dispatch(removeSelectedNote())
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation()
)(NoteList)
