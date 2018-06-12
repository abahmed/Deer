import React from 'react'
import { Redirect } from 'react-router-dom'

// Allows using main process modules from the renderer process
import { remote } from 'electron'

export default () => {
  const prefs = remote.getGlobal('prefs')

  // Show welcome page if user has not set preferred langauge.
  let showWelcome = !prefs.get('langauge')
  if (showWelcome) {
    return <Redirect to='/welcome' />
  }

  return (
    <div>
      <h1>Hello Home</h1>
    </div>
  )
}
