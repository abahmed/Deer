import { connect } from 'react-redux'
import NoteList from '../components/NoteList'
import {
  fetchAllNotes,
  setActiveNoteIndex
} from '../actions/note'

const mapStateToProps = state => ({
  activeNoteIndex: state.noteReducer.activeNoteIndex,
  notes: state.noteReducer.notes
})

const mapDispatchToProps = dispatch => ({
  fetchAllNotes: () => dispatch(fetchAllNotes()),
  setActiveNoteIndex: (noteIndex) => dispatch(setActiveNoteIndex(noteIndex))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList)
