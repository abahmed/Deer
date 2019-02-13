import React from 'react'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'

import List from '@material-ui/core/List'
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
    activeNoteIndex: PropTypes.number.isRequired,
    /**
     * array of notes
     */
    notes: PropTypes.array.isRequired,
    /**
     * fetches notes from database into notes array
     */
    fetchAllNotes: PropTypes.func.isRequired,
    /**
     * fetch a note with index
     */
    fetchNote: PropTypes.func.isRequired,
    /**
     * selects note with index
     */
    selectNote: PropTypes.func.isRequired,
    /**
     * deletes selected note
     */
    deleteNote: PropTypes.func.isRequired,
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
    this.state = {
      selectedIndex: 0
    }

    this.onNoteSelect = this.onNoteSelect.bind(this)
    this.onNoteDelete = this.onNoteDelete.bind(this)
  }

  /**
   * Checks if active note index exists or not
   * @return {boolean}
   */
  checkIfItemExists () {
    const currentIndex = this.props.activeNoteIndex

    // WORKAROUND: Unsaved item is unecessary added into notes list
    // checking by empty revision.
    return (currentIndex >= 0 &&
            this.props.notes[currentIndex] &&
            this.props.notes[currentIndex]['rev'])
  }

  /**
   * Called after mounting component.
   */
  componentDidMount () {
    const currentIndex = this.props.activeNoteIndex
    if (this.checkIfItemExists()) {
      this.props.fetchNote(currentIndex)
    }
  }

  /**
   * Called when user selects a note
   */
  onNoteSelect (noteIndex = -1) {
    // Do nothing as it's already selected.
    if (this.props.activeNoteIndex === noteIndex) { return }

    this.setState({ selectedIndex: noteIndex })
    this.props.selectNote(noteIndex)
  }

  /**
   * Called when user clicks for deleting selected note
   */
  onNoteDelete () {
    this.props.deleteNote()
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
            {this.props.notes.map((note, index) => (
              <NoteListItem
                key={index}
                id={index}
                text={note.title}
                selected={this.props.activeNoteIndex === index}
                onClick={this.onNoteSelect}
                onDelete={this.onNoteDelete} />
            ))}
          </List>
        </Scrollbars>
      </div>
    )
  }
}
export default withTheme()(withStyles(Styles)(NoteList))
