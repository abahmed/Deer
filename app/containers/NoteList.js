import { connect } from 'react-redux'
import NoteList from '../components/NoteList'
import {
  fetchAllNotes,
  setActiveNote
} from '../actions/noteList'

const mapStateToProps = state => ({
  activeNote: state.noteListReducer.activeNote,
  notes: state.noteListReducer.notes
})

const mapDispatchToProps = dispatch => ({
  fetchAllNotes: () => dispatch(fetchAllNotes()),
  setActiveNote: (noteId) => dispatch(setActiveNote(noteId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList)
