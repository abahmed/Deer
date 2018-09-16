import { connect } from 'react-redux'
import NoteList from '../components/NoteList'
import {
  fetchAllNotes,
  setActiveNoteIndex,
  fetchNote
} from '../actions/note'

const mapStateToProps = state => ({
  activeNoteIndex: state.noteReducer.activeNoteIndex,
  notes: state.noteReducer.notes
})

const mapDispatchToProps = dispatch => ({
  fetchAllNotes: () => dispatch(fetchAllNotes()),
  fetchNote: () => dispatch(fetchNote()),
  setActiveNoteIndex: (noteIndex) => dispatch(setActiveNoteIndex(noteIndex))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList)
