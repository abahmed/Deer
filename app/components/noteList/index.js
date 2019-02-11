import { connect } from 'react-redux'
import { compose } from 'redux'
import { withTranslation } from 'react-i18next'
import {
  fetchAllNotes,
  selectNote,
  fetchNote,
  deleteNote
} from '../../actions/note'

import NoteList from './noteList'

const mapStateToProps = state => ({
  activeNoteIndex: state.noteReducer.activeNoteIndex,
  notes: state.noteReducer.notes
})

const mapDispatchToProps = dispatch => ({
  fetchAllNotes: () => dispatch(fetchAllNotes()),
  fetchNote: () => dispatch(fetchNote()),
  deleteNote: () => dispatch(deleteNote()),
  selectNote: (noteIndex) => dispatch(selectNote(noteIndex))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation()
)(NoteList)
