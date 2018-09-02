import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'
import { NOTE_STATUS } from '../constants/noteStatus'

export default class StatusModal extends Component {
  constructor (props) {
    // Initialize this using super
    super()

    this.onSaveFail = this.onSaveFail.bind(this)
    this.onSaveSuccess = this.onSaveSuccess.bind(this)
  }

  // Called when saving note is failed.
  onSaveFail () {
    this.props.setSaveDisabled(false)
    this.props.updateNoteStatus(false)
  }

  // Called when saving note is succceed.
  onSaveSuccess () {
    this.props.setSaveDisabled(true)
    this.props.setNewNoteDisabled(false)
    this.props.updateNoteStatus()
  }

  render () {
    // This modal is shown when any operation happens.
    let showModal =
      this.props.noteStatus !== NOTE_STATUS.NO_OPERATION
      
    let modalBody = ''
    let callBack = ''
    let showFooter = false
    switch (this.props.noteStatus) {
      case NOTE_STATUS.SAVING_NOTE:
        modalBody = 'Saving note...'
        break
      case NOTE_STATUS.NOTE_SAVE_SUCCESS:
        modalBody = 'Note saved successfully.'
        this.onSaveSuccess()
        break
      case NOTE_STATUS.NOTE_SAVE_FAIL:
        modalBody = 'Unable to save note.'
        showFooter = true
        callBack = this.onSaveFail
        break
      default:
        break
    }
    return (
      <Modal isOpen={showModal}>
        <ModalBody className='center-text font-italic'>
          {modalBody}
        </ModalBody>
        {showFooter ? <ModalFooter className='hidden'>
          <button
            className='ml-2 btn btn-outline-danger btn-sm'
            onClick={callBack}>
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
  setNewNoteDisabled: PropTypes.func.isRequired
}
