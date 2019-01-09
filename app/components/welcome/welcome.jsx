import React, { Component } from 'react'
import PropTypes from 'prop-types'

// UI components.
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Fade from '@material-ui/core/Fade'
import NavigateNext from '@material-ui/icons/NavigateNext'
import Styles from './style'

// UI wrappers.
import { withStyles } from '@material-ui/core/styles'
import { withTheme } from '@material-ui/core/styles'

import { SUPPORTED_LANGS } from '../../i18n/locales'
import { LANG_LIST } from './langList'
import {
  setNotFirstTimeFlag,
  getDefaultLanguage
} from '../../utils/api.electron'


class Welcome extends Component {
  constructor (props) {
    super()
    this.state = {
      fadeIn: true,
      settings: {
        language: getDefaultLanguage()
      }
    }

    // Away from state to avoid re-rendering when their values change.
    this.langIndex = 0
    // Used to stop after navigating away from this component.
    this.timer = 0

    this.onLanguageChange = this.onLanguageChange.bind(this)
    this.onSaveSettings = this.onSaveSettings.bind(this)
  }

  componentWillMount () {
    this.updateLang()
  }

  componentWillUnmount () {
    // Stopping the timer to call updateLang
    clearTimeout(this.timer)
  }

  // Update fadeIn boolean and index, so UI is re-rendered with next values.
  updateLang() {
    // Update next lang index after fading out to be used for next fade-in.
    if (!this.state.fadeIn)
      this.updateNextLangIndex()

    this.timer = setTimeout(() => {
      this.toggleFade()
      this.updateLang()
    }, this.state.fadeIn ? 3000 : 180)
  }

  // Update the index value to point to the next element in the langList
  // array, and if it has reached the end, it's set to zero.
  updateNextLangIndex() {
    let index = this.langIndex + 1
    if (index >= LANG_LIST.length) {
      index = 0
    }
    this.langIndex = index
  }

  // Used for inverting values of fadeIn
  toggleFade() {
    this.setState(state => {
      return {
        ...state,
        fadeIn: !state.fadeIn
      }
    })
  }

  // Called when user clicks on next button.
  onSaveSettings () {
    // Saving new Language if it's different from defaults.
    if (this.state.settings.language !== getDefaultLanguage()) {
      this.props.saveSettings({language: this.state.settings.language})
    }

    setNotFirstTimeFlag()

    // Navigate to home page.
    this.props.history.push('/')
  }

  // Called when user changes language in select box.
  onLanguageChange (event) {
    this.setState(state => {
      return {
        ...state,
        settings: {
          language: event.target.value
        }
      }
    })
    event.persist()
  }

  render () {
    const lang = LANG_LIST[this.langIndex]
    const { classes } = this.props
    return (
      <Grid container justify='center' className={classes.root}>
        <Paper className={classes.paper}>
            <img
              src={require('../../assets/images/Deer-256.png')}
            />
            <Fade in={this.state.fadeIn}>
              <Typography
                variant='h5'
                component='h5'
                className={classes.item}>
                {lang.welcome}
              </Typography>
            </Fade>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor='language'>
                {lang.selectLang}
              </InputLabel>
              <Select
                value={this.state.settings.language}
                onChange={this.onLanguageChange}
                name='language'
              >
                {SUPPORTED_LANGS.map((lang, index) => (
                  <MenuItem key={index} value={lang.code}>
                    {lang.language}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant='contained'
              color='primary'
              className={classes.item}
              onClick={this.onSaveSettings}>
            {lang.nextBtn}
            <NavigateNext className={classes.nextIconSize}/>
            </Button>
        </Paper>
      </Grid>
    )
  }
}

Welcome.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}
export default withTheme()(withStyles(Styles)(Welcome))