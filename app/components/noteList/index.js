import { connect } from 'react-redux'
import { compose } from 'redux'
import { withNamespaces } from 'react-i18next'
import {
  fetchAllNotes,
  selectNote,
  fetchNote
} from '../../actions/note'

import NoteList from './component'

const mapStateToProps = state => ({
  activeNoteIndex: state.noteReducer.activeNoteIndex,
  notes: state.noteReducer.notes
})

const mapDispatchToProps = dispatch => ({
  fetchAllNotes: () => dispatch(fetchAllNotes()),
  fetchNote: () => dispatch(fetchNote()),
  selectNote: (noteIndex) => dispatch(selectNote(noteIndex))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNamespaces()
)(NoteList)
