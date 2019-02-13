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
     * index of current selected note
     */
    activeNoteIndex: PropTypes.number.isRequired,
    /**
     * fetches notes from database into notes array
     */
    fetchAllNotes: PropTypes.func.isRequired,
    /**
     * array of notes
     */
    notes: PropTypes.array.isRequired,
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
    this.props.fetchAllNotes()
  }

  /**
   * Decides whether to show NoteEditor or Dashboard component.
   * @return {element}
   */
  getHomeContent () {
    const { notes } = this.props
    // Show homeContent when no note is selected.
    if (this.props.activeNoteIndex >= 0 &&
    notes[this.props.activeNoteIndex]) {
      return (<NoteEditor />)
    }
    return (<Dashboard />)
  }

  /**
   * Rendering method
   */
  render () {
    if (checkRedirectToWelcomePage()) {
      return (
        <Redirect to='/welcome' />
      )
    }

    const { notes, classes } = this.props
    return (
      <div className={classes.root}>
        <Slide in>
          <Grid container>
            { notes.length > 0
              ? <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <NotesPanel />
                </Paper>
              </Grid> : ''
            }
            <Grid item xs>
              <Paper className={classes.paper}>
                {this.getHomeContent()}
              </Paper>
            </Grid>
          </Grid>
        </Slide>
      </div>
    )
  }
}
export default withTheme()(withStyles(Styles)(Home))
