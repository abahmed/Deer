import { connect } from 'react-redux'
import HomeContent from '../components/HomeContent'

const mapStateToProps = state => ({
  activeNote: state.noteReducer.activeNote
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContent)
