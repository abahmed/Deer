import React from 'react'
import { Redirect } from 'react-router-dom'
import { checkRedirectToWelcomePage, setNotFirstTimeFlag } from '../../utils/api.electron'

export default () => {
  if (checkRedirectToWelcomePage()) {
    setNotFirstTimeFlag()
    return (
      <Redirect to='/welcome' />
    )
  }
  return (
    <div>
      <h1>Deer</h1>
    </div>
  )
}
