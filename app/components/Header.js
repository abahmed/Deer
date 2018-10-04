import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ACTIONS } from '../constants/actions'

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

  render () {
    const { t } = this.props
    let newNoteBtnClass = 'btn btn-outline-success btn-sm'
    if (this.props.isNewNoteDisabled) { newNoteBtnClass += ' disabled' }

    let saveBtnClass = 'ml-2 btn btn-outline-primary btn-sm'
    if (this.props.isSaveDisabled) { saveBtnClass += ' disabled' }

    let deleteBtnClass = 'ml-2 btn btn-outline-danger btn-sm'
    if (this.props.isDeleteDisabled) { deleteBtnClass += ' disabled' }

    return (
      <nav className='navbar sticky-top navbar-light bg-light'>
        <img
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
