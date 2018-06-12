import React, { Component } from 'react'
import { Button, Fade } from 'reactstrap'
import { Link } from 'react-router-dom'
import langs from '../constants/welcome.json'

class Welcome extends Component {
  componentDidMount() {
    this.props.setWelcomeLang(langs)
    this.props.updateLang()
  }

  _doNext() {

  }

  render() {
    let lang = this.props.lang
    return (
      <div className='welcome-page'>
         <img className= 'logo' src={require('../assets/images/Deer-256.png')}/>
         <br/>
         <div ref='welcomeText'>
          <Fade
            in={this.props.fadeIn}
            className='center-text welcome'>{lang.welcome}</Fade>
          <Fade
            in={this.props.fadeIn}
            className='center-text language-text'>{lang.selectLang}</Fade>
         </div>
          <select className="form-control">
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
export default Welcome
