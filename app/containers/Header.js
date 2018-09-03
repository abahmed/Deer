import { connect } from 'react-redux'
import Header from '../components/Header'
import {
  setNewNoteDisabled
} from '../actions/header'
import {
  addNewNote
} from '../actions/note'
import {
  toggleSaveModal
} from '../actions/modal'

const mapStateToProps = state => ({
  isNewNoteDisabled: state.headerReducer.isNewNoteDisabled,
  isSaveDisabled: state.headerReducer.isSaveDisabled
})

const mapDispatchToProps = dispatch => ({
  addNewNote: () => dispatch(addNewNote()),
  setNewNoteDisabled: (flag) => dispatch(setNewNoteDisabled(flag)),
  toggleSaveModal: () => dispatch(toggleSaveModal())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
