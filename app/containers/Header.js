import { connect } from 'react-redux'
import { compose } from 'redux'
import { withNamespaces } from 'react-i18next'
import Header from '../components/Header'
import {
  setNewNoteDisabled,
  setDeleteDisabled,
  setSaveDisabled
} from '../actions/header'
import {
  addNewNote,
  saveNote,
  deleteNote
} from '../actions/note'
import {
  toggleSaveModal,
  toggleDeleteModal
} from '../actions/modal'

const mapStateToProps = state => ({
  isNewNoteDisabled: state.headerReducer.isNewNoteDisabled,
  isSaveDisabled: state.headerReducer.isSaveDisabled,
  isDeleteDisabled: state.headerReducer.isDeleteDisabled
})

const mapDispatchToProps = dispatch => ({
  addNewNote: () => dispatch(addNewNote()),
  setNewNoteDisabled: (flag) => dispatch(setNewNoteDisabled(flag)),
  setSaveDisabled: (flag) => dispatch(setSaveDisabled(flag)),
  setDeleteDisabled: (flag) => dispatch(setDeleteDisabled(flag)),
  saveNote: () => dispatch(saveNote()),
  deleteNote: () => dispatch(deleteNote()),
  toggleDeleteModal: () => dispatch(toggleDeleteModal()),
  toggleSaveModal: () => dispatch(toggleSaveModal())
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNamespaces()
)(Header)
