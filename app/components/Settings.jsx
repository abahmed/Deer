import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'
import { getDefaultLanguage } from '../../utils/api.electron'
import { SUPPORTED_LANGS } from '../constants/i18n'
import { SETTINGS_STATUS } from '../constants/settingsStatus'

export default class Settings extends Component {
  constructor (props) {
    // Initialize this using super
    super()

    this.onSaveSettings = this.onSaveSettings.bind(this)
    this.onLanguageChange = this.onLanguageChange.bind(this)
    this._isSaveDisabled = this._isSaveDisabled.bind(this)

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

    const { t } = this.props
    const isSaveDisabled = this._isSaveDisabled()

    return (
      <div className='container'>
        <div className='row justify-content-center settings-top-row'>
          <h2>{t('settings:settings')}</h2>
        </div>
        <div className='row justify-content-start'>
          <label>{t('settings:language')}</label>
          <select className='form-control'
            defaultValue={this._defaults.language}
            onChange={this.onLanguageChange}>
            {SUPPORTED_LANGS.map((lang, index) => (
              <option
                key={index}
                index={index}
                value={lang.code}>
                {lang.language}
              </option>
            ))}
          </select>
        </div>
        <div className='row justify-content-end settings-bottom-row'>
          <button
            className='ml-2 btn btn-outline-primary'
            onClick={this.onSaveSettings}
            disabled={isSaveDisabled}>
            {t('settings:saveBtn')}
          </button>
          <Link to='/'>
            <button className='ml-2 btn btn-outline-danger'>
              {t('settings:cancelBtn')}
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

Settings.propTypes = {
  t: PropTypes.func.isRequired,
  saveSettings: PropTypes.func.isRequired,
  setReadyStatus: PropTypes.func.isRequired,
  settingsStatus: PropTypes.string.isRequired
}
