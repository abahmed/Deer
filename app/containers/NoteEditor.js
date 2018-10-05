import { connect } from 'react-redux'
import { compose } from 'redux'
import { withNamespaces } from 'react-i18next'
import NoteEditor from '../components/NoteEditor'
import {
  setSaveDisabled,
  setNewNoteDisabled,
  setDeleteDisabled
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
  setDeleteDisabled: (flag) => dispatch(setDeleteDisabled(flag)),
  setNewNoteDisabled: (flag) => dispatch(setNewNoteDisabled(flag)),
  updateNoteTitle: (content) => dispatch(updateNoteTitle(content))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNamespaces()
)(NoteEditor)
