import { connect } from 'react-redux'
import NoteList from '../components/NoteList'
import {
  fetchAllNotes,
  setActiveNote
} from '../actions/note'

const mapStateToProps = state => ({
  activeNote: state.noteReducer.activeNote,
  notes: state.noteReducer.notes
})

const mapDispatchToProps = dispatch => ({
  fetchAllNotes: () => dispatch(fetchAllNotes()),
  setActiveNote: (noteId) => dispatch(setActiveNote(noteId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList)
