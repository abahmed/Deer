import React from 'react'
import PropTypes from 'prop-types'
import { Modal as BootstrapModal, ModalBody, ModalFooter } from 'reactstrap'

export default class Modal extends React.Component {
  constructor (props) {
    super(props)
    this.getFooter = this.getFooter.bind(this)
  }

  getFooter () {
    const { t } = this.props
    switch (this.props.type) {
      case 'YesNo':
        return (
          <ModalFooter>
            <button
              className='ml-2 btn btn-outline-success btn-sm'
              onClick={this.props.callBack}>
              {t('yesNoModal:yesBtn')}
            </button>
            <button
              className='ml-2 btn btn-outline-danger btn-sm'
              onClick={this.props.toggleModal}>
              {t('yesNoModal:noBtn')}
            </button>
          </ModalFooter>
        )
    }
  }

  render () {
    return (
      <BootstrapModal isOpen={this.props.showModal}>
        <ModalBody>
          { this.props.children }
        </ModalBody>
        <ModalFooter>
          { this.getFooter() }
        </ModalFooter>
      </BootstrapModal>
    )
  }
}
Modal.propTypes = {
  callBack: PropTypes.func,
  showModal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  type: PropTypes.string.isRequired
}
