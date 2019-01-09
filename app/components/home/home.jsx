import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Slide from '@material-ui/core/Slide'
import Styles from './style'

// UI wrappers.
import { withStyles } from '@material-ui/core/styles'
import { withTheme } from '@material-ui/core/styles'


import { checkRedirectToWelcomePage } from '../../utils/api.electron'
import NotesPanel from '../notesPanel'
import Dashboard from '../dashboard'
import NoteEditor from '../noteEditor'

class Home extends Component {
  constructor (props) {
    super()

    this.getHomeContent = this.getHomeContent.bind(this)
  }

  componentDidMount () {
    // Trigger fetching notes as this component is loaded.
    this.props.fetchAllNotes()
  }

  getHomeContent() {
    const { notes, t } = this.props
    // Show homeContent when no note is selected.
    if (this.props.activeNoteIndex >= 0 &&
    notes[this.props.activeNoteIndex]) {
      return (<NoteEditor />)
    }
    return (<Dashboard />)
  }

  render () {
    if (checkRedirectToWelcomePage()) {
      return (
        <Redirect to='/welcome' />
      )
    }

    const { notes, t, classes } = this.props
    return (
      <div className={classes.root}>
        <Slide in={true}>
          <Grid container>
            { notes.length > 0 ?
            <Grid item xs={4}>
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

Home.propTypes = {
  activeNoteIndex: PropTypes.number.isRequired,
  fetchAllNotes: PropTypes.func.isRequired,
  notes: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
}
export default withTheme()(withStyles(Styles)(Home))