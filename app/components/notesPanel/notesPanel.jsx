import React from 'react'
import PropTypes from 'prop-types'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import DashboardIcon from '@material-ui/icons/Dashboard'
import Styles from './style'

import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'

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
     * searches for a note
     */
    searchNote: PropTypes.func.isRequired,
    /**
     * clears results of search
     */
    clearSearch: PropTypes.func.isRequired,
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

    this.saveTimer = null
    this.previousQuery = null

    this.handleOnClickNewNote = this.handleOnClickNewNote.bind(this)
    this.handleViewDashboard = this.handleViewDashboard.bind(this)
    this.handleOnSearch = this.handleOnSearch.bind(this)
  }

  /**
   * Called when user clicks on new note button.
   */
  handleOnClickNewNote () {
    this.props.createNote()
  }

  /**
   * Called when user clicks on view dashboard button.
   */
  handleViewDashboard () {
    // deselects selected note.
    this.props.showDashboard()
  }

  /**
   * Called when user writes in searchbox.
   */
  handleOnSearch (event) {
    const query = event.target.value.trim()
    if (query === this.previousQuery) {
      return
    }

    this.previousQuery = query

    if (!query) {
      this.props.clearSearch()
      clearTimeout(this.saveTimer)
      return
    }

    // There is a change in content
    if (this.saveTimer) {
      clearTimeout(this.saveTimer)
    }
    this.saveTimer = setTimeout(() => {
      this.props.searchNote(query)
    }, 300)
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
            <IconButton color='primary' onClick={this.handleOnClickNewNote}>
              <NoteAddIcon />
            </IconButton>
            <IconButton color='primary' onClick={this.handleViewDashboard}>
              <DashboardIcon />
            </IconButton>
          </Toolbar>
          <Toolbar variant='dense' className={classes.toolbar}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Search…'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                onChange={this.handleOnSearch}
              />
            </div>
          </Toolbar>
        </AppBar>
        <NoteList />
      </div>
    )
  }
}
export default withTheme()(withStyles(Styles)(NotesPanel))
