import { connect } from 'react-redux'
import NoteList from '../components/NoteList'
import {
  fetchAllNotes
} from '../actions/noteList'

const mapStateToProps = state => ({
  notes: state.noteListReducer.notes
})

const mapDispatchToProps = dispatch => ({
  fetchAllNotes: () => dispatch(fetchAllNotes())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList)
