import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getDefaultLanguage } from '../../utils/api.electron'
import { SUPPORTED_LANGS } from '../constants/i18n'

export default class HomeContent extends Component {
  constructor (props) {
    // Initialize this using super
    super()

    this.onSaveSettings = this.onSaveSettings.bind(this)
  }

  onSaveSettings () {
    // Saving new Language.

  }

  render () {
    const { t } = this.props
    const defaultLanguage = getDefaultLanguage()

    return (
      <div className='container'>
        <div className='row justify-content-center settings-top-row'>
          <h2>{t('settings:settings')}</h2>
        </div>
        <div className='row justify-content-start'>
          <label>{t('settings:language')}</label>
          <select className='form-control' defaultValue={defaultLanguage}>
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
            className='ml-2 btn btn-outline-primary btn-lg'
            onClick={this.onSaveSettings}>
            {t('settings:saveBtn')}
          </button>
          <Link to='/'>
            <button className='ml-2 btn btn-outline-danger btn-lg'>
              {t('settings:cancelBtn')}
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

HomeContent.propTypes = {
  t: PropTypes.func.isRequired
}
