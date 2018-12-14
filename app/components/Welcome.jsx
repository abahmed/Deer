import React, { Component } from 'react'
import { Button, Fade } from 'reactstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import { SUPPORTED_LANGS } from '../constants/i18n'

import {
  setNotFirstTimeFlag,
  getDefaultLanguage
} from '../../utils/api.electron'

export default class Welcome extends Component {
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
    // Index value has not been set, so there is nothing to show.
    if (this.props.index === -1) {
      return (<Spinner />)
    }

    const lang = this.props.langList[this.props.index]
    return (
      <div className='welcome-page'>
        <img
          className='logo'
          src={require('./../../assets/images/Deer-256.png')}
        />
        <br />
        <br />
        <div ref='welcomeText'>
          <Fade in={this.props.fadeIn} className='center-text welcome'>
            {lang.welcome}
          </Fade>
        </div>
        <br />
        <label htmlFor='select'>{lang.selectLang}</label>
        <select
          className='form-control'
          name='language'
          defaultValue='en'
          onChange={this.onLanguageChange}>
          {SUPPORTED_LANGS.map((lang, index) => (
            <option key={index} index={index} value={lang.code}>
              {lang.language}
            </option>
          ))}
        </select>
        <Link to='/'>
          <Button
            onClick={this.onSaveSettings}
            className='center-button'
            color='primary'>
            {lang.nextBtn}
          </Button>
        </Link>
      </div>
    )
  }
}

Welcome.propTypes = {
  index: PropTypes.number.isRequired,
  fadeIn: PropTypes.bool.isRequired,
  langList: PropTypes.array.isRequired,
  updateLang: PropTypes.func.isRequired,
  stopUpdateLang: PropTypes.func.isRequired,
  saveSettings: PropTypes.func.isRequired
}
