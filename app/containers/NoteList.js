import { connect } from 'react-redux'
import NoteList from '../components/NoteList'
import {
  fetchAllNotes,
  setActiveNoteIndex,
  setNoteStatus,
  fetchNote
} from '../actions/note'

const mapStateToProps = state => ({
  activeNoteIndex: state.noteReducer.activeNoteIndex,
  notes: state.noteReducer.notes
})

const mapDispatchToProps = dispatch => ({
  fetchAllNotes: () => dispatch(fetchAllNotes()),
  fetchNote: (noteIndex) => dispatch(fetchNote(noteIndex)),
  setActiveNoteIndex: (noteIndex) => dispatch(setActiveNoteIndex(noteIndex)),
  setNoteStatus: (status) => dispatch(setNoteStatus(status))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList)
