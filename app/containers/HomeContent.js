import { connect } from 'react-redux'
import { compose } from 'redux'
import { withNamespaces } from 'react-i18next'
import HomeContent from '../components/HomeContent'

const mapStateToProps = state => ({
  activeNoteIndex: state.noteReducer.activeNoteIndex
})

const mapDispatchToProps = dispatch => ({
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNamespaces()
)(HomeContent)
