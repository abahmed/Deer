import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import { SUPPORTED_LANGS } from '../constants/i18n'
import { withStyles } from '@material-ui/core/styles'
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
import { withTheme } from '@material-ui/core/styles';

import {
  setNotFirstTimeFlag,
  getDefaultLanguage
} from '../../utils/api.electron'

const styles = {
  welcome: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    minWidth: '-webkit-fill-available',
  },
  formControl: {
    minWidth: 'inherit',
    marginTop: '10px',
    display: 'flex',
  },
  label: {
    minWidth: '400px'
  },
  item: {
    marginTop: '15px',
    minWidth: '-webkit-fill-available',
    textAlign: 'center'
  },
  grid: {
    minHeight: '100vh',
    backgroundColor: '#ECEFF1',
    alignItems: 'center'
  },
  iconSize: {
    fontSize: '21px',
  },
  Button: {
    backgroundColor: '#38a272',
    color: 'white'
  }
};

class Welcome extends Component {
  constructor (props) {
    super()
    this.state = {}
    this.onLanguageChange = this.onLanguageChange.bind(this)
    this.onSaveSettings = this.onSaveSettings.bind(this)

    this._defaults = { language: getDefaultLanguage() }
  }
  componentWillMount () {
    this.props.updateLang()
  }

  componentWillUnmount () {
    this.props.stopUpdateLang()
  }

  // Called when user clicks on next button.
  onSaveSettings () {
    // Saving new Language.
    let newSettings = {
      language: this.state.language
    }
    for (let setting in this.state) {
      // Avoid adding same settings as a new settings.
      if (this.state[setting] !== this._defaults[setting]) {
        newSettings[setting] = this.state[setting]
      }
    }

    this.props.saveSettings(newSettings)
    setNotFirstTimeFlag()

    // Navigate to home page.
    this.props.history.push('/')
  }

  onLanguageChange (event) {
    this.setState(state => {
      return {
        ...state,
        language: event.target.value
      }
    })
    event.persist()
  }

  render () {
    console.log(this.props)
    // Index value has not been set, so there is nothing to show.
    if (this.props.index === -1) {
      return (<Spinner />)
    }

    const lang = this.props.langList[this.props.index]
    const { classes } = this.props
    return (
      <Grid container justify='center' className={classes.grid}>
        <Paper>
          <div className={classes.welcome}>
          <img src={require('./../../assets/images/Deer-256.png')} />
          <Fade in={this.props.fadeIn}>
            <Typography variant='h5' component='h5' className={classes.item}>
              {lang.welcome}
            </Typography>
          </Fade>
          <FormControl className={classes.formControl}>
            <InputLabel
              htmlFor='language'
              className={classes.label}>
              {lang.selectLang}
            </InputLabel>
            <Select
              value={this.state.language || ''}
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
              className={classes.item}
              onClick={this.onSaveSettings}>
            {lang.nextBtn}
            <NavigateNext className={classes.iconSize}/>
            </Button>
          </div>
        </Paper>
      </Grid>
    )
  }
}
export default withTheme()(withStyles(styles)(Welcome))
Welcome.propTypes = {
  index: PropTypes.number.isRequired,
  fadeIn: PropTypes.bool.isRequired,
  langList: PropTypes.array.isRequired,
  updateLang: PropTypes.func.isRequired,
  stopUpdateLang: PropTypes.func.isRequired,
  saveSettings: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}
