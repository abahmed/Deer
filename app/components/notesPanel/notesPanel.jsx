import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import DashboardIcon from '@material-ui/icons/Dashboard'
import Styles from './style'

// UI wrappers.
import { withStyles, withTheme } from '@material-ui/core/styles'

import { ACTIONS } from '../../constants/actions'
import NoteList from '../noteList'

class NotesPanel extends Component {
  constructor (props) {
    super()

    this.viewDashboard = this.viewDashboard.bind(this)
    this.onClickNewNote = this.onClickNewNote.bind(this)
  }

  // Called when users clicks on new note button.
  onClickNewNote () {
    this.props.addNewNote()
  }

  viewDashboard () {
    this.props.setActiveNoteIndex(ACTIONS.NOT_SELECTED_NOTE)
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position='static' color='default'>
          <Toolbar variant='dense' className={classes.toolbar}>
            <IconButton
              color='primary'
              onClick={this.onClickNewNote}>
              <NoteAddIcon />
            </IconButton>
            <IconButton
              color='primary'
              onClick={this.viewDashboard}>
              <DashboardIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <NoteList />
      </div>
    )
  }
}

NotesPanel.propTypes = {
  addNewNote: PropTypes.func.isRequired,
  setActiveNoteIndex: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}
export default withTheme()(withStyles(Styles)(NotesPanel))
