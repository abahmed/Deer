import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Slide from '@material-ui/core/Slide'
import Styles from './style'

// UI wrappers.
import { withStyles, withTheme } from '@material-ui/core/styles'

import { checkRedirectToWelcomePage } from '../../utils/api.electron'
import NotesPanel from '../notesPanel'
import Dashboard from '../dashboard'
import NoteEditor from '../noteEditor'
/**
 * Home Component
 */
class Home extends React.Component {
  static propTypes = {
    /**
     * ID of current selected note
     */
    selectedNoteID: PropTypes.string.isRequired,
    /**
     * used to determine if there are notes or not
     */
    hasNotes: PropTypes.bool.isRequired,
    /**
     * fetches notes from database into notes array
     */
    fetchAllNotes: PropTypes.func.isRequired,
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
    this.getHomeContent = this.getHomeContent.bind(this)
  }

  /**
   * Called after mounting component.
   */
  componentDidMount () {
    // Trigger fetching notes as this component is loaded.
    if (!this.props.hasNotes) {
      this.props.fetchAllNotes()
    }
  }

  /**
   * Decides whether to show NoteEditor or Dashboard component.
   * @return {element}
   */
  getHomeContent () {
    // Show homeContent when no note is selected.
    if (this.props.selectedNoteID) {
      return <NoteEditor />
    }
    return <Dashboard />
  }

  /**
   * Rendering method
   */
  render () {
    if (checkRedirectToWelcomePage()) {
      return <Redirect to='/welcome' />
    }

    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Slide in>
          <Grid container>
            {this.props.hasNotes ? (
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <NotesPanel />
                </Paper>
              </Grid>
            ) : (
              ''
            )}
            <Grid item xs>
              <Paper className={classes.paper}>{this.getHomeContent()}</Paper>
            </Grid>
          </Grid>
        </Slide>
      </div>
    )
  }
}
export default withTheme()(withStyles(Styles)(Home))
