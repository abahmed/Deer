import { connect } from 'react-redux'
import NoteList from '../components/NoteList'
import {
  fetchAllNotes,
  selectNote,
  fetchNote
} from '../actions/note'

const mapStateToProps = state => ({
  activeNoteIndex: state.noteReducer.activeNoteIndex,
  notes: state.noteReducer.notes
})

const mapDispatchToProps = dispatch => ({
  fetchAllNotes: () => dispatch(fetchAllNotes()),
  fetchNote: () => dispatch(fetchNote()),
  selectNote: (noteIndex) => dispatch(selectNote(noteIndex))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList)
