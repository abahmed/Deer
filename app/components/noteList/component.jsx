import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'

import NoteListItem from '../noteListItem'

import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import NotesIcon from '@material-ui/icons/Notes'

// UI wrappers.
import { withStyles } from '@material-ui/core/styles'
import { withTheme } from '@material-ui/core/styles'

import Styles from './style'

class NoteList extends Component {
  constructor (props) {
    super()
    this.state = {
      selectedIndex: 0
    }

    this.onNoteSelect = this.onNoteSelect.bind(this)
  }

  checkIfItemExists () {
    const currentIndex = this.props.activeNoteIndex

    // WORKAROUND: Unsaved item is unecessary added into notes list - checking by empty revision
    return (currentIndex >= 0 && this.props.notes[currentIndex] && this.props.notes[currentIndex]['rev'])
  }


  componentDidMount () {
    const currentIndex = this.props.activeNoteIndex
    if (this.checkIfItemExists()) {
      this.props.fetchNote(currentIndex)
    }
  }

  onNoteSelect (noteIndex = -1) {
    // Do nothing as it's already selected.
    if (this.props.activeNoteIndex === noteIndex) { return }

    this.setState({ selectedIndex: noteIndex })
    this.props.selectNote(noteIndex)
  }

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
                callback={this.onNoteSelect}/>
            ))}
          </List>
        </Scrollbars>
      </div>
    )
  }
}

NoteList.propTypes = {
  activeNoteIndex: PropTypes.number.isRequired,
  notes: PropTypes.array.isRequired,
  fetchAllNotes: PropTypes.func.isRequired,
  fetchNote: PropTypes.func.isRequired,
  selectNote: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}
export default withTheme()(withStyles(Styles)(NoteList))