import { connect } from 'react-redux'
import { compose } from 'redux'
import { withTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import {
  fetchAllNoteBooks,
  createNoteBook,
  setActiveNoteBookID,
  setSelectedNoteBookID,
  removeSelectedNoteBook,
  openNoteBook,
  closeNoteBook,
  createNoteList,
  deleteNoteList
} from '../../actions/notebook'
import NoteBook from './notebook'

const mapStateToProps = state => {
  const nameList = {}
  const noteBooks = []
  const noteBooksList = state.noteBookReducer.get('noteBooks')
  const noteBookNotes = state.noteBookReducer.get('noteBookNotes')
  const activeNoteBookID = state.noteBookReducer.get('activeNoteBookID')
  const activeNoteBook = noteBooksList[activeNoteBookID] || {}
  const noteIDs = activeNoteBook['noteIDs'] || []

  for (const noteBookID in noteBooksList) {
    const noteBook = noteBooksList[noteBookID]
    nameList[noteBook.name] = true
  }

  for (const noteBookID in noteBooksList) {
    const noteBook = noteBooksList[noteBookID]
    noteBooks.push({
      id: noteBookID,
      name: noteBook.name,
      modified: noteBook.modified
    })
  }

  // Sort notebooks by Date
  noteBooks.sort((a, b) => {
    return new Date(b.modified) - new Date(a.modified)
  })

  return {
    activeNoteBookID: activeNoteBookID,
    noteIDs: noteIDs,
    nameList: nameList,
    noteBooks: noteBooks,
    hasNoteList: Object.keys(noteBookNotes).length !== 0,
    hasNoteBooks: Object.keys(noteBooksList).length !== 0,
    noteBookIsOpened: state.noteBookReducer.get('noteBookIsOpened')
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAllNoteBooks: () => dispatch(fetchAllNoteBooks()),
  createNoteBook: name => dispatch(createNoteBook(name)),
  setActiveNoteBookID: noteBookID => dispatch(setActiveNoteBookID(noteBookID)),
  setSelectedNoteBookID: noteBookID => dispatch(setSelectedNoteBookID(noteBookID)),
  removeSelectedNoteBook: () => dispatch(removeSelectedNoteBook()),
  openNoteBook: () => dispatch(openNoteBook()),
  closeNoteBook: () => dispatch(closeNoteBook()),
  createNoteList: () => dispatch(createNoteList()),
  deleteNoteList: () => dispatch(deleteNoteList())
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withTranslation(),
  withRouter
)(NoteBook)
