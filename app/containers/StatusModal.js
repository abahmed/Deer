import { connect } from 'react-redux'
import StatusModal from '../components/StatusModal'
import {
  updateNoteStatus
} from '../actions/modal'
import {
  setSaveDisabled,
  setNewNoteDisabled,
  setDeleteDisabled
} from '../actions/header'

const mapStateToProps = state => ({
  noteStatus: state.noteReducer.noteStatus
})

const mapDispatchToProps = dispatch => ({
  updateNoteStatus: (withTimeOut, status) =>
    dispatch(updateNoteStatus(withTimeOut, status)),
  setSaveDisabled: (flag) => dispatch(setSaveDisabled(flag)),
  setNewNoteDisabled: (flag) => dispatch(setNewNoteDisabled(flag)),
  setDeleteDisabled: (flag) => dispatch(setDeleteDisabled(flag))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusModal)
