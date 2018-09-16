import { connect } from 'react-redux'
import YesNoModal from '../components/YesNoModal'
import {
  toggleYesNoModal
} from '../actions/modal'
import {
  setSaveDisabled,
  setDeleteDisabled
} from '../actions/header'
import {
  saveNote,
  deleteNote
} from '../actions/note'

const mapStateToProps = state => ({
  showYesNoModal: state.modalReducer.showYesNoModal,
  yesNoAction: state.modalReducer.yesNoAction
})

const mapDispatchToProps = dispatch => ({
  toggleYesNoModal: (action) => dispatch(toggleYesNoModal(action)),
  setSaveDisabled: (flag) => dispatch(setSaveDisabled(flag)),
  setDeleteDisabled: (flag) => dispatch(setDeleteDisabled(flag)),
  saveNote: () => dispatch(saveNote()),
  deleteNote: () => dispatch(deleteNote())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YesNoModal)
