import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import SettingsIcon from '@material-ui/icons/Settings'
import InfosIcon from '@material-ui/icons/Info'
import PopoverIcon from '../popoverIcon'
import Styles from './style'

// UI wrappers.
import { withStyles, withTheme } from '@material-ui/core/styles'

/**
 * Dashboard Component
 */
class Dashboard extends React.Component {
  static propTypes = {
    /**
     * adds a new note
     */
    createNote: PropTypes.func.isRequired,
    /**
     * styles for this component
     */
    classes: PropTypes.object.isRequired,
    /**
     * theme used generally in App
     */
    theme: PropTypes.object.isRequired,
    /**
     * gets current translation
     */
    t: PropTypes.func.isRequired,
    /**
     * used for navigation
     */
    history: PropTypes.object.isRequired
  }

  /**
   * this is constructor description.
   * @param {object} props passed to component
   */
  constructor (props) {
    super()

    this.onClickNewNote = this.onClickNewNote.bind(this)
    this.onClickSettings = this.onClickSettings.bind(this)
    this.onClickAbout = this.onClickAbout.bind(this)
  }

  /**
   * Called when users clicks on new note button.
   */
  onClickNewNote () {
    this.props.createNote()
  }

  /**
   * Called when users clicks on settings button.
   */
  onClickSettings () {
    this.props.history.push('/settings')
  }

  /**
   * Called when users clicks on about button.
   */
  onClickAbout () {
    this.props.history.push('/about')
  }

  /**
   * Rendering method
   */
  render () {
    const { classes, t } = this.props
    return (
      <Fade in>
        <div className={classes.root}>
          <img className={classes.img} src={require('../../assets/images/Deer-256.png')} />
          <Typography variant='h5' className={classes.item}>
            {t('dashboard:welcome')}
          </Typography>
          <Grid item>
            <PopoverIcon
              text={t('dashboard:newNote')}
              icon={<NoteAddIcon fontSize='large' />}
              callback={this.onClickNewNote}
            />
            <PopoverIcon
              text={t('dashboard:settings')}
              icon={<SettingsIcon fontSize='large' />}
              callback={this.onClickSettings}
            />
            <PopoverIcon
              text={t('dashboard:about')}
              icon={<InfosIcon fontSize='large' />}
              callback={this.onClickAbout}
            />
          </Grid>
        </div>
      </Fade>
    )
  }
}
export default withTheme()(withStyles(Styles)(Dashboard))
