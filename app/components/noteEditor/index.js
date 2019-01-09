import { connect } from 'react-redux'
import { compose } from 'redux'
import { withNamespaces } from 'react-i18next'
import NoteEditor from './noteEditor'
import {
  updateNoteTitle,
  updateActiveNoteContent,
  saveNote
} from '../../actions/note'

const mapStateToProps = state => ({
  activeNoteContent: state.noteReducer.activeNoteContent
})

const mapDispatchToProps = dispatch => ({
  updateActiveNoteContent: (content) => dispatch(updateActiveNoteContent(content)),
  updateNoteTitle: (content) => dispatch(updateNoteTitle(content)),
  saveNote: () => dispatch(saveNote())
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNamespaces()
)(NoteEditor)
