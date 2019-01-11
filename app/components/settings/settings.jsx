import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Slide from '@material-ui/core/Slide'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import Styles from './style'

// UI wrappers.
import { withStyles, withTheme } from '@material-ui/core/styles'

import { getDefaultLanguage } from '../../utils/api.electron'
import { SETTINGS_STATUS } from '../../constants/settingsStatus'
import { SUPPORTED_LANGS } from '../../i18n/locales'

class Settings extends Component {
  constructor (props) {
    // Initialize this using super
    super()

    this.state = {
      language: getDefaultLanguage()
    }

    this.onSaveSettings = this.onSaveSettings.bind(this)
    this.onLanguageChange = this.onLanguageChange.bind(this)
    this._isSaveDisabled = this._isSaveDisabled.bind(this)
    this.onCancelClick = this.onCancelClick.bind(this)

    this._defaults = {
      language: getDefaultLanguage()
    }
  }

  // Returns true if user's settings haven't been changed from it's defaults,
  // otherwise returns false.
  _isSaveDisabled () {
    for (let setting in this.state) {
      if (this.state[setting] !== this._defaults[setting]) {
        return false
      }
    }
    return true
  }

  // Called when user changes language.
  onLanguageChange (event) {
    // Local component state used for UI internally, so we don't need to keep
    // it in Redux.
    this.setState({ language: event.target.value })
  }

  // Called when user clicks on save button.
  onSaveSettings () {
    // Saving new Language.
    let newSettings = {}
    for (let setting in this.state) {
      // Avoid adding same settings as a new settings.
      if (this.state[setting] !== this._defaults[setting]) {
        newSettings[setting] = this.state[setting]
      }
    }
    this.props.saveSettings(newSettings)
  }

  onCancelClick () {
    this.props.history.push('/')
  }

  componentWillUnmount () {
    this.props.setReadyStatus()
  }

  render () {
    const settingsStatus = this.props.settingsStatus
    // New settings have been saved successfully, so redirect to home.
    if (settingsStatus === SETTINGS_STATUS.SETTINGS_SAVE_SUCCESS) {
      return (
        <Redirect to='/' />
      )
    } else if (settingsStatus === SETTINGS_STATUS.SETTINGS_SAVE_FAIL) {
      // TODO: Handle saving failure.
    }

    const { classes, t } = this.props
    return (
      <Slide in direction='left'>
        <Grid container justify='center' className={classes.root}>
          <Paper className={classes.paper}>
            <Typography variant='h5'>{t('settings:settings')}</Typography>
            <Divider className={classes.divider} />
            <Grid container>
              <Grid item xs={6}>
                <Typography variant='body1'>{t('settings:language')}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Select
                  value={this.state.language}
                  onChange={this.onLanguageChange}
                  className={classes.select}
                  color='primary'>
                  {SUPPORTED_LANGS.map((lang, index) => (
                    <MenuItem key={index} value={lang.code}>
                      {lang.language}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <div className={classes.buttons}>
              <Button
                variant='contained'
                color='primary'
                className={classes.button}
                disabled={this._isSaveDisabled()}
                onClick={this.onSaveSettings}>
                {t('settings:saveBtn')}
                <SaveIcon className={classes.nextIconSize} />
              </Button>
              <Button
                variant='contained'
                color='primary'
                className={classes.button}
                onClick={this.onCancelClick}>
                {t('settings:cancelBtn')}
                <CancelIcon className={classes.nextIconSize} />
              </Button>
            </div>
          </Paper>
        </Grid>
      </Slide>
    )
  }
}

Settings.propTypes = {
  saveSettings: PropTypes.func.isRequired,
  setReadyStatus: PropTypes.func.isRequired,
  settingsStatus: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}
export default withTheme()(withStyles(Styles)(Settings))
