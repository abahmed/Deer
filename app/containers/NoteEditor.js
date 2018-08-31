import { connect } from 'react-redux'
import NoteEditor from '../components/NoteEditor'
import {
  updateEditorState
} from '../actions/noteEditor'
import {
  setSaveDisabled,
  setNewNoteDisabled
} from '../actions/header'

const mapStateToProps = state => ({
  editorState: state.noteEditorReducer.editorState
})

const mapDispatchToProps = dispatch => ({
  updateEditorState: (editorState) => dispatch(updateEditorState(editorState)),
  setSaveDisabled: (flag) => dispatch(setSaveDisabled(flag)),
  setNewNoteDisabled: (flag) => dispatch(setNewNoteDisabled(flag))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteEditor)
