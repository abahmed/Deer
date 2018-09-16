import React from 'react'
import { Redirect } from 'react-router-dom'
import Header from './../containers/Header'
import NoteList from './../containers/NoteList'
import HomeContent from './../containers/HomeContent'
import YesNoModal from './../containers/YesNoModal'
import StatusModal from './../containers/StatusModal'
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
      <div className='container-fluid row flex-xl-nowrap home-container'>
        <div className='col-12 col-md-3 col-xl-3 home-sidebar'>
          <NoteList />
        </div>
        <div className='col-12 col-md-9 col-xl-9 home-content'>
          <HomeContent />
        </div>
      </div>
      <YesNoModal />
      <StatusModal />
    </div>
  )
}
