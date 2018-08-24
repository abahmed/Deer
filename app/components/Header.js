import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Header extends Component {
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
            <button className={btnClassNames}>
              New Note
            </button>
          </li>
        </ul>
      </nav>
    )
  }
}

Header.propTypes = {
  isNewNoteDisabled: PropTypes.bool.isRequired
}
