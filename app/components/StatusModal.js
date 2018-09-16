import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'
import { NOTE_STATUS } from '../constants/noteStatus'

export default class StatusModal extends Component {
  constructor (props) {
    // Initialize this using super
    super()

    this._getModalConfig = this._getModalConfig.bind(this)
    this.onSaveFail = this.onSaveFail.bind(this)
    this.onLoadFail = this.onLoadFail.bind(this)
    this.onDeleteFail = this.onDeleteFail.bind(this)
  }

  componentDidUpdate () {
    switch (this.props.noteStatus) {
      case NOTE_STATUS.NOTE_SAVE_SUCCESS:
        this.props.setSaveDisabled(true)
        this.props.setNewNoteDisabled(false)
        this.props.updateNoteStatus()
        break
      case NOTE_STATUS.NOTE_LOAD_SUCCESS:
      case NOTE_STATUS.NOTE_DELETE_SUCCESS:
        this.props.updateNoteStatus()
        break
      default:
        break
    }
  }

  // Called when saving note is failed.
  onSaveFail () {
    this.props.setSaveDisabled(false)
    this.props.updateNoteStatus(false)
  }

  // Called when loading note is failed.
  onLoadFail () {
    this.props.updateNoteStatus(false)
  }

  onDeleteFail () {
    this.props.setDeleteDisabled(false)
    this.props.updateNoteStatus(false)
  }

  _getModalConfig () {
    // This modal is shown when any operation happens.
    let showModal =
      this.props.noteStatus !== NOTE_STATUS.NO_OPERATION

    let modalBody = ''
    let callBack = () => {}
    let showFooter = false
    switch (this.props.noteStatus) {
      case NOTE_STATUS.SAVING_NOTE:
        modalBody = 'Saving note...'
        break
      case NOTE_STATUS.NOTE_SAVE_SUCCESS:
        modalBody = 'Note saved successfully.'
        break
      case NOTE_STATUS.NOTE_SAVE_FAIL:
        modalBody = 'Unable to save note.'
        showFooter = true
        callBack = this.onSaveFail
        break
      case NOTE_STATUS.LOADING_NOTE:
        modalBody = 'Loading note...'
        break
      case NOTE_STATUS.NOTE_LOAD_SUCCESS:
        modalBody = 'Note loaded successfully.'
        break
      case NOTE_STATUS.NOTE_LOAD_FAIL:
        modalBody = 'Unable to load note.'
        showFooter = true
        callBack = this.onLoadFail
        break
      case NOTE_STATUS.DELETING_NOTE:
        modalBody = 'Deleting note...'
        break
      case NOTE_STATUS.NOTE_DELETE_SUCCESS:
        modalBody = 'Note deleted successfully.'
        break
      case NOTE_STATUS.NOTE_DELETE_FAIL:
        modalBody = 'Unable to delete note.'
        showFooter = true
        callBack = this.onDeleteFail
        break
      default:
        break
    }
    return {
      showModal: showModal,
      modalBody: modalBody,
      callBack: callBack,
      showFooter: showFooter
    }
  }

  render () {
    const modalConfig = this._getModalConfig()
    return (
      <Modal isOpen={modalConfig.showModal}>
        <ModalBody className='center-text font-italic'>
          {modalConfig.modalBody}
        </ModalBody>
        {modalConfig.showFooter ? <ModalFooter>
          <button
            className='ml-2 btn btn-outline-danger btn-sm'
            onClick={modalConfig.callBack}>
             Ok
          </button>
        </ModalFooter> : ''}
      </Modal>
    )
  }
}

StatusModal.propTypes = {
  noteStatus: PropTypes.string.isRequired,
  updateNoteStatus: PropTypes.func.isRequired,
  setSaveDisabled: PropTypes.func.isRequired,
  setNewNoteDisabled: PropTypes.func.isRequired,
  setDeleteDisabled: PropTypes.func.isRequired
}
