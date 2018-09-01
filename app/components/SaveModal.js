import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'

export default class SaveModal extends Component {
  constructor (props) {
    // Initialize this using super
    super()

    this.onSaveNote = this.onSaveNote.bind(this)
  }

  onSaveNote () {
    this.props.setSaveDisabled(true)
    this.props.toggleSaveModal()
  }

  render () {
    return (
      <Modal isOpen={this.props.showSaveModal}>
        <ModalBody>
            Do you want to save this note?
        </ModalBody>
        <ModalFooter>
          <button
            className='ml-2 btn btn-outline-success btn-sm'
            onClick={this.onSaveNote}>
             Yes
          </button>
          <button
            className='ml-2 btn btn-outline-danger btn-sm'
            onClick={this.props.toggleSaveModal}>
             No
          </button>
        </ModalFooter>
      </Modal>
    )
  }
}

SaveModal.propTypes = {
  showSaveModal: PropTypes.bool.isRequired,
  toggleSaveModal: PropTypes.func.isRequired,
  setSaveDisabled: PropTypes.func.isRequired
}
