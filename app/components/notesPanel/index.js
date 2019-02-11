import { connect } from 'react-redux'
import { compose } from 'redux'
import { withTranslation } from 'react-i18next'

import { addNewNote, setActiveNoteIndex } from '../../actions/note'
import NotesPanel from './notesPanel'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  addNewNote: () => dispatch(addNewNote()),
  setActiveNoteIndex: (noteIndex) => dispatch(setActiveNoteIndex(noteIndex))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation()
)(NotesPanel)
