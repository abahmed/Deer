import { connect } from 'react-redux'
import NoteEditor from '../components/NoteEditor'
import {
  onSaveEditorState
} from '../actions/noteEditor'

const mapStateToProps = state => ({
  activeNote: state.noteListReducer.activeNote,
  editorState: state.noteEditorReducer.editorState
})

const mapDispatchToProps = dispatch => ({
  onSaveEditorState: (editorState) => dispatch(onSaveEditorState(editorState))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteEditor)
