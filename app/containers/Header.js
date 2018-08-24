import { connect } from 'react-redux'
import Header from '../components/Header'
import {
  setNewNoteDisabled
} from '../actions/header'

const mapStateToProps = state => ({
  isNewNoteDisabled: state.headerReducer.isNewNoteDisabled
})

const mapDispatchToProps = dispatch => ({
  setNewNoteDisabled: (flag) => dispatch(setNewNoteDisabled(flag))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
