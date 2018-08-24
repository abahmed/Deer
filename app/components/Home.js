import React from 'react'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import Header from './../containers/Header'
import HomeContent from './HomeContent'
import NoteList from './../containers/NoteList'
import NoteEditor from './../containers/NoteEditor'
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
    <BrowserRouter>
      <div>
        <Header />
        <div className='container-fluid row flex-xl-nowrap home-container'>
          <div className='col-12 col-md-3 col-xl-3 home-sidebar'>
            <NoteList />
          </div>
          <div className='col-12 col-md-9 col-xl-9 home-content'>
            <Route path='/note/:noteId' component={NoteEditor} />
            <Route exact path='/' component={HomeContent} />
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}
