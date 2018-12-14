import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ACTIONS } from '../constants/actions'
import { ipcRenderer } from 'electron'

export default class Header extends Component {
  constructor (props) {
    // Initialize this using super
    super()

    this.onAddNote = this.onAddNote.bind(this)
    this.onSaveNote = this.onSaveNote.bind(this)
    this.onDeleteNote = this.onDeleteNote.bind(this)
  }

  onAddNote () {
    // Do not proceed as button is disabled
    if (this.props.isNewNoteDisabled) return

    this.props.setNewNoteDisabled(true)
    this.props.addNewNote()
  }

  onSaveNote () {
    // Do not proceed as button is disabled
    if (this.props.isSaveDisabled) return

    this.props.toggleYesNoModal(ACTIONS.SAVE_NOTE)
  }

  onDeleteNote () {
    // Do not proceed as button is disabled
    if (this.props.isDeleteDisabled) return

    this.props.toggleYesNoModal(ACTIONS.DELETE_NOTE)
  }

  openAboutUsWindow () {
    ipcRenderer.send('open-about-us-window')
  }

  render () {
    const { t } = this.props

    let newNoteBtnClass = 'btn btn-outline-success btn-sm'
    if (this.props.isNewNoteDisabled) { newNoteBtnClass += ' disabled' }

    let saveBtnClass = 'ml-2 btn btn-outline-primary btn-sm'
    if (this.props.isSaveDisabled) { saveBtnClass += ' disabled' }

    let deleteBtnClass = 'ml-2 btn btn-outline-danger btn-sm'
    if (this.props.isDeleteDisabled) { deleteBtnClass += ' disabled' }
    return (
      <nav className='navbar fixed-top sticky-top navbar-light bg-light'>
        <img
          onClick={this.openAboutUsWindow}
          src={require('./../../assets/images/Deer-32.png')}
          className='d-inline-block align-top' />
        <ul className='navbar-nav flex-row ml-md-auto d-none d-md-flex'>
          <li className='nav-item'>
            <button className={newNoteBtnClass} onClick={this.onAddNote}>
              {t('header:newNoteBtn')}
            </button>
          </li>
          <li className='nav-item'>
            <button className={saveBtnClass} onClick={this.onSaveNote}>
              {t('header:saveBtn')}
            </button>
          </li>
          <li className='nav-item'>
            <button className={deleteBtnClass} onClick={this.onDeleteNote}>
              {t('header:deleteBtn')}
            </button>
          </li>
          <li className='nav-item'>
            <Link to='/settings'>
              <button className='ml-2 btn btn-outline-info btn-sm'>
                {t('header:settingsBtn')}
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}

Header.propTypes = {
  addNewNote: PropTypes.func.isRequired,
  setNewNoteDisabled: PropTypes.func.isRequired,
  isNewNoteDisabled: PropTypes.bool.isRequired,
  isSaveDisabled: PropTypes.bool.isRequired,
  isDeleteDisabled: PropTypes.bool.isRequired,
  toggleYesNoModal: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}
