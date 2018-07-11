import React from 'react'
import { Button } from 'reactstrap'
export default () => (
  <nav className='navbar sticky-top navbar-light bg-light'>
    <img
      src={require('../assets/images/Deer-32.png')}
      className='d-inline-block align-top' />
    <ul className='navbar-nav flex-row ml-md-auto d-none d-md-flex'>
      <li className='nav-item'>
        <Button
          outline color='success'
          size='sm'>
        New Note
        </Button>
      </li>
    </ul>
  </nav>
)
