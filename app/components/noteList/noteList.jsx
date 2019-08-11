import React from 'react'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'

import List from '@material-ui/core/List'
import FlipMove from 'react-flip-move'
import Styles from './style'

// UI wrappers.
import { withStyles, withTheme } from '@material-ui/core/styles'

import NoteListItem from '../noteListItem'

/**
 * NoteList Component
 */
class NoteList extends React.Component {
  static propTypes = {
    /**
     * index of current selected note
     */
    selectedNoteID: PropTypes.string.isRequired,
    /**
     * array of notes
     */
    notes: PropTypes.array.isRequired,
    /**
     * notes of the current active notebook
     */
    noteBookNotes: PropTypes.object.isRequired,
    /**
     * index of active notebook
     */
    activeNoteBookID: PropTypes.string.isRequired,
    /**
     * selects note with ID
     */
    setSelectedNoteID: PropTypes.func.isRequired,
    /**
     * deletes selected note
     */
    removeSelectedNote: PropTypes.func.isRequired,
    /**
     * set note as custom startup note
     */
    setCustomStartupNote: PropTypes.func.isRequired,
    /**
     * adds note to active notebook
     */
    addToActiveNoteBook: PropTypes.func.isRequired,
    /**
     * removes note from active notebook
     */
    removeFromActiveNoteBook: PropTypes.func.isRequired,
    /**
     * save changes for active notebook
     */
    saveActiveNoteBook: PropTypes.func.isRequired,
    /**
     * styles for this component
     */
    classes: PropTypes.object.isRequired,
    /**
     * theme used generally in App
     */
    theme: PropTypes.object.isRequired
  }

  /**
   * this is constructor description.
   * @param {object} props passed to component
   */
  constructor (props) {
    super()

    this.onNoteSelect = this.onNoteSelect.bind(this)
    this.onNoteDelete = this.onNoteDelete.bind(this)
    this.onNoteBookClick = this.onNoteBookClick.bind(this)
    this.onCustom = this.onCustom.bind(this)
  }

  /**
   * Called when user selects a note
   */
  onNoteSelect (noteID) {
    // Do nothing as it's already selected.
    if (this.props.selectedNoteID === noteID) {
      return
    }

    this.props.setSelectedNoteID(noteID)
  }

  /**
   * Called when user clicks for deleting selected note
   */
  onNoteDelete () {
    this.props.removeSelectedNote()
  }

  /**
   * Called when user clicks on custom note
   */
  onCustom (noteID) {
    this.props.setCustomStartupNote(noteID)
  }

  /**
   * Called when user clicks on notebook icon
   */
  onNoteBookClick (noteID, isInNoteBook) {
    if (isInNoteBook) {
      this.props.removeFromActiveNoteBook(noteID)
      this.props.removeFromNoteIDs(noteID)
      this.props.saveActiveNoteBook()
    } else {
      this.props.addToActiveNoteBook(noteID)
      this.props.addToNoteIDs(noteID)
      this.props.saveActiveNoteBook()
    }
  }

  /**
   * Rendering method
   */
  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Scrollbars>
          <List component='nav' className={classes.list}>
            <FlipMove typeName={null}>
              {this.props.notes.map(note => (
                <NoteListItem
                  key={note.id}
                  id={note.id}
                  text={note.title}
                  modified={note.modified}
                  selected={this.props.selectedNoteID === note.id}
                  isInNoteBook={Boolean(this.props.noteBookNotes[note.id])}
                  noteBookIsActive={this.props.activeNoteBookID !== 'none'}
                  onClick={this.onNoteSelect}
                  onDelete={this.onNoteDelete}
                  onImportant={this.onCustom}
                  onNoteBook={this.onNoteBookClick}
                />
              ))}
            </FlipMove>
          </List>
        </Scrollbars>
      </div>
    )
  }
}
export default withTheme()(withStyles(Styles)(NoteList))
