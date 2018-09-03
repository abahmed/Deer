import { connect } from 'react-redux'
import SaveModal from '../components/SaveModal'
import {
  toggleSaveModal
} from '../actions/modal'
import {
  setSaveDisabled
} from '../actions/header'
import {
  saveNote
} from '../actions/note'

const mapStateToProps = state => ({
  showSaveModal: state.modalReducer.showSaveModal
})

const mapDispatchToProps = dispatch => ({
  toggleSaveModal: () => dispatch(toggleSaveModal()),
  setSaveDisabled: (flag) => dispatch(setSaveDisabled(flag)),
  saveNote: () => dispatch(saveNote())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveModal)
