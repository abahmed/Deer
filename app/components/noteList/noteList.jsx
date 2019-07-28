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
    setCustomStartupNopte: PropTypes.func.isRequired,
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
    this.props.setCustomStartupNopte(noteID)
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
                  onClick={this.onNoteSelect}
                  onDelete={this.onNoteDelete}
                  onImportant={this.onCustom}
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
