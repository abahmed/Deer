import { connect } from 'react-redux'
import NoteEditor from '../components/NoteEditor'
import {
  setSaveDisabled,
  setNewNoteDisabled
} from '../actions/header'
import {
  updateNoteTitle,
  updateActiveNoteState
} from '../actions/note'

const mapStateToProps = state => ({
  activeNoteState: state.noteReducer.activeNoteState
})

const mapDispatchToProps = dispatch => ({
  updateActiveNoteState: (state) => dispatch(updateActiveNoteState(state)),
  setSaveDisabled: (flag) => dispatch(setSaveDisabled(flag)),
  setNewNoteDisabled: (flag) => dispatch(setNewNoteDisabled(flag)),
  updateNoteTitle: (content) => dispatch(updateNoteTitle(content))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteEditor)
