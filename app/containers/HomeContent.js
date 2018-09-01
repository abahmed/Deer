import { connect } from 'react-redux'
import HomeContent from '../components/HomeContent'

const mapStateToProps = state => ({
  activeNoteIndex: state.noteReducer.activeNoteIndex
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContent)
