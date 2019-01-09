import { connect } from 'react-redux'
import { compose } from 'redux'
import { withNamespaces } from 'react-i18next'
import NoteEditor from './noteEditor'
import {
  updateNoteTitle,
  updateActiveNoteState,
  saveNote
} from '../../actions/note'

const mapStateToProps = state => ({
  activeNoteState: state.noteReducer.activeNoteState
})

const mapDispatchToProps = dispatch => ({
  updateActiveNoteState: (state) => dispatch(updateActiveNoteState(state)),
  updateNoteTitle: (content) => dispatch(updateNoteTitle(content)),
  saveNote: () => dispatch(saveNote())
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNamespaces()
)(NoteEditor)
