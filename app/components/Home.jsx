import React from 'react'
import { Redirect } from 'react-router-dom'
import Header from '../containers/Header'
import NoteList from '../containers/NoteList'
import HomeContent from '../containers/HomeContent'
import YesNoModal from '../containers/YesNoModal'
import StatusModal from '../containers/StatusModal'
import { checkRedirectToWelcomePage } from '../../utils/api.electron'

export default () => {
  if (checkRedirectToWelcomePage()) {
    return (
      <Redirect to='/welcome' />
    )
  }

  return (
    <div>
      <Header />
      <div className='container-fluid row flex-xl-nowrap home-container'>
        <div className='col-3 col-md-3 col-xl-2 home-sidebar'>
          <NoteList />
        </div>
        <div className='col-9 col-md-9 col-xl-10 home-content'>
          <HomeContent />
        </div>
      </div>
      <YesNoModal />
      <StatusModal />
    </div>
  )
}
