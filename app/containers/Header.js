import { connect } from 'react-redux'
import { compose } from 'redux'
import { withNamespaces } from 'react-i18next'
import Header from '../components/Header'
import {
  setNewNoteDisabled
} from '../actions/header'
import {
  addNewNote
} from '../actions/note'
import {
  toggleYesNoModal
} from '../actions/modal'

const mapStateToProps = state => ({
  isNewNoteDisabled: state.headerReducer.isNewNoteDisabled,
  isSaveDisabled: state.headerReducer.isSaveDisabled,
  isDeleteDisabled: state.headerReducer.isDeleteDisabled
})

const mapDispatchToProps = dispatch => ({
  addNewNote: () => dispatch(addNewNote()),
  setNewNoteDisabled: (flag) => dispatch(setNewNoteDisabled(flag)),
  toggleYesNoModal: (action) => dispatch(toggleYesNoModal(action))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNamespaces()
)(Header)
