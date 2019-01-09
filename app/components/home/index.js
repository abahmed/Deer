import { connect } from 'react-redux'
import { compose } from 'redux'
import { withNamespaces } from 'react-i18next'
import {
  fetchAllNotes
} from '../../actions/note'

import Home from './home'

const mapStateToProps = state => ({
  activeNoteIndex: state.noteReducer.activeNoteIndex,
  notes: state.noteReducer.notes
})

const mapDispatchToProps = dispatch => ({
  fetchAllNotes: () => dispatch(fetchAllNotes())
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNamespaces()
)(Home)
