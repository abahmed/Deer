import React, { Component } from 'react'
import electron from 'electron'

export default class Home extends Component {
  render () {
    // when the user hits home page we do not want
    // to redisplay welcome page again
    let electronStore = electron.remote.getGlobal('sharedObj').electronStore
    electronStore.set('not-first-time', true)
    return (
      <div>
        <h1>Deer</h1>
      </div>
    )
  }
}
