import React, { Component } from 'react'
import { Button, Fade } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import electron from 'electron'

export default class Welcome extends Component {
  componentWillMount () {
    this.props.updateLang()
  }

  render () {
    // Index value has not set, so there is nothing to show.
    if (this.props.index === -1) {
      return (<Spinner />)
    }

    // show welcome page only if the user did not hit
    // home page ever
    let electronStore = electron.remote.getGlobal('sharedObj').electronStore
    if (electronStore.has('not-first-time') && electronStore.get('not-first-time') === true) {
      return (
        <div>
          <Redirect to='/' />
        </div>
      )
    }

    let lang = this.props.langList[this.props.index]
    return (
      <div className='welcome-page'>
        <img className='logo' src={require('../assets/images/Deer-256.png')} />
        <br /><br />
        <div ref='welcomeText'>
          <Fade
            in={this.props.fadeIn}
            className='center-text welcome'>{lang.welcome}
          </Fade>
        </div>
        <br />
        <Link to='/'>
          <Button
            className='center-button'
            color='primary'>
            {lang.nextBtn}
          </Button>
        </Link>
      </div>
    )
  }
}

Welcome.propTypes = {
  index: PropTypes.number.isRequired,
  fadeIn: PropTypes.bool.isRequired,
  langList: PropTypes.array.isRequired,
  updateLang: PropTypes.func.isRequired
}
