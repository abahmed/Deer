import React, { Component } from 'react'
import { Button, Fade } from 'reactstrap'
import PropTypes from 'prop-types'
import Spinner from './Spinner'

export default class Welcome extends Component {
  componentWillMount () {
    this.props.updateLang()
  }

  _doNext () {

  }

  render () {
    if (this.props.index === -1) {
      return (<Spinner />)
    }

    let lang = this.props.langList[this.props.index]
    return (
      <div className='welcome-page'>
        <img className='logo' src={require('../assets/images/Deer-256.png')} />
        <br />
        <div ref='welcomeText'>
          <Fade
            in={this.props.fadeIn}
            className='center-text welcome'>{lang.welcome}</Fade>
          <Fade
            in={this.props.fadeIn}
            className='center-text language-text'>{lang.selectLang}</Fade>
        </div>
        <select className='form-control'>
          {this.props.langList.map((lang, index) => (
            <option key={index}>{lang.lang}</option>
          ))}
        </select>
        <Button
          className='center-button'
          color='primary'
          onClick={() => this._doNext()}>{lang.nextBtn}</Button>
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
