import React from 'react'
import PropTypes from 'prop-types'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import DashboardIcon from '@material-ui/icons/Dashboard'
import Styles from './style'

// UI wrappers.
import { withStyles, withTheme } from '@material-ui/core/styles'

import NoteList from '../noteList'

/**
 * NotesPanel Component
 */
class NotesPanel extends React.Component {
  static propTypes = {
    /**
     * adds a new note
     */
    createNote: PropTypes.func.isRequired,
    /**
     * shows dashboard
     */
    showDashboard: PropTypes.func.isRequired,
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

    this.viewDashboard = this.viewDashboard.bind(this)
    this.onClickNewNote = this.onClickNewNote.bind(this)
  }

  /**
   * Called when users clicks on new note button.
   */
  onClickNewNote () {
    this.props.createNote()
  }

  /**
   * Called when users clicks on view dashboard button.
   */
  viewDashboard () {
    // deselects selected note.
    this.props.showDashboard()
  }

  /**
   * Rendering method
   */
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
export default withTheme()(withStyles(Styles)(NotesPanel))
