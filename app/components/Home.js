import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Header from './Header'
import HomeContent from './HomeContent'
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
      <div className='container-fluid row flex-xl-nowrap'>
        <div className='col-12 col-md-3 col-xl-3 home-sidebar' />
        <div className='col-12 col-md-9 col-xl-9 home-content'>
          <Route exact path='/' component={HomeContent}/>
        </div>
      </div>
    </div>
  )
}
