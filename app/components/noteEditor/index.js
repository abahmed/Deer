import { connect } from 'react-redux'
import { compose } from 'redux'
import { withTranslation } from 'react-i18next'
import NoteEditor from './noteEditor'
import { editSelectedNote, saveSelectedNote } from '../../actions/note'

const mapStateToProps = state => {
  const selectedNoteID = state.noteReducer.get('selectedNoteID')
  const selectedNote = state.noteReducer.get('notes')[selectedNoteID]
  return {
    selectedNoteContent: selectedNote.content
  }
}

const mapDispatchToProps = dispatch => ({
  editSelectedNote: (title = null, content, modified) => {
    dispatch(
      editSelectedNote({
        title,
        content,
        modified
      })
    )
  },
  saveSelectedNote: () => dispatch(saveSelectedNote())
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withTranslation()
)(NoteEditor)
