import { connect } from 'react-redux'
import Header from '../components/Header'
import {
  setNewNoteDisabled
} from '../actions/header'
import {
  addNewNote
} from '../actions/note'

const mapStateToProps = state => ({
  isNewNoteDisabled: state.headerReducer.isNewNoteDisabled
})

const mapDispatchToProps = dispatch => ({
  addNewNote: () => dispatch(addNewNote()),
  setNewNoteDisabled: (flag) => dispatch(setNewNoteDisabled(flag))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
