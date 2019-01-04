import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as os from 'os'
import { openExternalLink } from '../../utils/api.electron'
import packageJson from '../../../package.json'
import Styles from './style'

import Slide from '@material-ui/core/Slide'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import HomeIcon from '@material-ui/icons/Home'
import PopoverIcon from '../popoverIcon'

// UI wrappers.
import { withStyles } from '@material-ui/core/styles'
import { withTheme } from '@material-ui/core/styles'

class About extends Component {
  constructor (props) {
    super()

    this.openIssuesLink = this.openIssuesLink.bind(this)
    this.openAppLink = this.openAppLink.bind(this)
    this.onClickHome = this.onClickHome.bind(this)
  }

  // Redirects to Main component.
  onClickHome () {
    this.props.history.push('/')
  }

  // Open link for reporting issues in browser.
  openIssuesLink () {
    openExternalLink(packageJson.bugs.url)
  }

  // Open link for the app in browser.
  openAppLink () {
    openExternalLink(packageJson.repository.url)
  }

  render () {
    const { classes, t } = this.props
    return (
      <Slide in={true} direction='left'>
        <div className={classes.root}>
          <img
            className={classes.img}
            src={require('../../assets/images/Deer-256.png')}/>
          <div className={classes.content}>
            <Typography variant='h3'>
              {packageJson.productName}
            </Typography>
            <Typography variant='h6'>
              {packageJson.version} - {os.type()} ({os.arch()})
            </Typography>
            <Divider className={classes.divider}/>
            <Typography variant='body1'>
              {packageJson.description}
            </Typography>
            <Typography variant='body2'>
              Copyright © 2017–2019 {packageJson.productName} Authors
            </Typography>
            <Typography variant='body2'>
              Distributed under {packageJson.license} License
            </Typography>
            <Typography variant='body2'>
              Want to help?
              <span className={classes.link} onClick={this.openIssuesLink}>
                Report an issue
              </span>
              , or
              <span className={classes.link} onClick={this.openAppLink}>
                contribute
              </span>
            </Typography>
            <PopoverIcon
              text={t('about:homeBtn')}
              icon={<HomeIcon fontSize='large' />}
              callback={this.onClickHome} />
          </div>
        </div>
      </Slide>
    )
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}
export default withTheme()(withStyles(Styles)(About))