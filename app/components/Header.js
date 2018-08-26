import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Header extends Component {
  constructor (props) {
    // Initialize this using super
    super()

    this.onAddNote = this.onAddNote.bind(this)
  }

  onAddNote () {
    // Do not proceed as button is disabled
    if (this.props.isNewNoteDisabled) return

    this.props.setNewNoteDisabled(true)
    this.props.addNewNote()
  }

  render () {
    let btnClassNames = 'btn btn-outline-success btn-sm'
    if (this.props.isNewNoteDisabled) { btnClassNames += ' disabled' }

    return (
      <nav className='navbar sticky-top navbar-light bg-light'>
        <img
          src={require('../assets/images/Deer-32.png')}
          className='d-inline-block align-top' />
        <ul className='navbar-nav flex-row ml-md-auto d-none d-md-flex'>
          <li className='nav-item'>
            <button className={btnClassNames} onClick={this.onAddNote}>
              New Note
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
  isNewNoteDisabled: PropTypes.bool.isRequired
}
