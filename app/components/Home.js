import React from 'react'
import { Redirect } from 'react-router-dom'
import Header from './Header'
import {
  checkRedirectToWelcomePage,
  setNotFirstTimeFlag
} from '../../utils/api.electron'

export default () => {
  if (checkRedirectToWelcomePage()) {
    setNotFirstTimeFlag()
    return (
      <Redirect to='/welcome' />
    )
  }
  return (
    <div>
      <Header />
    </div>
  )
}
