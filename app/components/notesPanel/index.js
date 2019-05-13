import { connect } from 'react-redux'
import { compose } from 'redux'
import { withTranslation } from 'react-i18next'

import { createNote, setSelectedNoteID, searchNoteContains, updateSearchList } from '../../actions/note'
import NotesPanel from './notesPanel'
import { ACTIONS } from '../../constants/actions'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  createNote: () => dispatch(createNote()),
  showDashboard: () => {
    dispatch(setSelectedNoteID(ACTIONS.NOT_SELECTED_NOTE))
  },
  searchNote: (query) => dispatch(searchNoteContains(query)),
  clearSearch: () => dispatch(updateSearchList([]))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation()
)(NotesPanel)
