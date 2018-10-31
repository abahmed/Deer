import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Modal from '../components/Modal'

export default class Header extends Component {
  constructor (props) {
    // Initialize this using super
    super(props)
    this.onAddNote = this.onAddNote.bind(this)
    this.onSaveNote = this.onSaveNote.bind(this)
    this.onDeleteNote = this.onDeleteNote.bind(this)
    this.deleteCallback = this.deleteCallback.bind(this)
    this.saveCallBack = this.saveCallBack.bind(this)
  }

  deleteCallBack () {
    this.props.deleteNote()
    this.props.setDeleteDisabled(true)
    this.props.toggleDeleteModal()
  }

  saveCallBack () {
    this.props.saveNote()
    this.props.setSaveDisabled(true)
    this.props.toggleDeleteModal()
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

    this.props.toggleSaveModal()
  }

  onDeleteNote () {
    // Do not proceed as button is disabled
    if (this.props.isDeleteDisabled) return

    this.props.toggleDeleteModal()
  }

  render () {
    const { t } = this.props
    let newNoteBtnClass = 'btn btn-outline-success btn-sm' + this.props.isNewNoteDisabled ? 'disabled' : ''
    let saveBtnClass = 'ml-2 btn btn-outline-primary btn-sm' + this.props.isSaveDisabled ? 'disabled' : ''
    let deleteBtnClass = 'ml-2 btn btn-outline-danger btn-sm' + this.props.isDeleteDisabled ? 'disabled' : ''
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
          <li className='nav-item'>
            <Link to='/settings'>
              <button className='ml-2 btn btn-outline-info btn-sm'>
                {t('header:settingsBtn')}
              </button>
            </Link>
          </li>
        </ul>
        <Modal type='YesNo' showModal={this.props.showSaveModal} callBack={this.saveCallBack}>
          {t('yesNoModal:saveNote')}
        </Modal>
        <Modal type='YesNo' showModal={this.props.showDeleteModal} callBack={this.deleteCallBack}>
          {t('yesNoModal:deleteNote')}
        </Modal>
      </nav>
    )
  }
}

Header.propTypes = {
  addNewNote: PropTypes.func.isRequired,
  setNewNoteDisabled: PropTypes.func.isRequired,
  setDeleteDisabled: PropTypes.func.isRequired,
  setSaveDisabled: PropTypes.func.isRequired,
  isNewNoteDisabled: PropTypes.bool.isRequired,
  isSaveDisabled: PropTypes.bool.isRequired,
  isDeleteDisabled: PropTypes.bool.isRequired,
  toggleSaveModal: PropTypes.func.isRequired,
  toggleDeleteModal: PropTypes.func.isRequired,
  showSaveModal: PropTypes.bool.isRequired,
  showDeleteModal: PropTypes.bool.isRequired,
  saveNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}
