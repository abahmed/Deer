import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'
import { ACTIONS } from '../constants/actions'

export default class YesNoModal extends Component {
  constructor (props) {
    // Initialize this using super
    super()

    this._getModalConfig = this._getModalConfig.bind(this)
    this.onSaveNote = this.onSaveNote.bind(this)
    this.onDeleteNote = this.onDeleteNote.bind(this)
  }

  // Called when saving is confirmed.
  onSaveNote () {
    this.props.setSaveDisabled(true)
    this.props.toggleYesNoModal()
    this.props.saveNote()
  }

  // Called when deleting is confirmed.
  onDeleteNote () {
    this.props.setDeleteDisabled(true)
    this.props.toggleYesNoModal()
    this.props.deleteNote()
  }

  _getModalConfig () {
    let modalBody = ''
    let callBack = () => {}
    switch (this.props.yesNoAction) {
      case ACTIONS.SAVE_NOTE:
        modalBody = 'Do you want to save this note?'
        callBack = this.onSaveNote
        break
      case ACTIONS.DELETE_NOTE:
        modalBody = 'Do you want to delete this note?'
        callBack = this.onDeleteNote
        break
      default:
        break
    }
    return {
      modalBody: modalBody,
      callBack: callBack
    }
  }

  render () {
    const modalConfig = this._getModalConfig()
    return (
      <Modal isOpen={this.props.showYesNoModal}>
        <ModalBody>
          {modalConfig.modalBody}
        </ModalBody>
        <ModalFooter>
          <button
            className='ml-2 btn btn-outline-success btn-sm'
            onClick={modalConfig.callBack}>
             Yes
          </button>
          <button
            className='ml-2 btn btn-outline-danger btn-sm'
            onClick={this.props.toggleYesNoModal}>
             No
          </button>
        </ModalFooter>
      </Modal>
    )
  }
}

YesNoModal.propTypes = {
  yesNoAction: PropTypes.string.isRequired,
  showYesNoModal: PropTypes.bool.isRequired,
  toggleYesNoModal: PropTypes.func.isRequired,
  setSaveDisabled: PropTypes.func.isRequired,
  setDeleteDisabled: PropTypes.func.isRequired,
  saveNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired
}
