import React from 'react'
import PropTypes from 'prop-types'
import os from 'os'

import Slide from '@material-ui/core/Slide'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import HomeIcon from '@material-ui/icons/Home'
import PopoverIcon from '../popoverIcon'
import Styles from './style'

// UI wrappers.
import { withStyles, withTheme } from '@material-ui/core/styles'

import packageJson from '../../../package.json'
import { openExternalLink } from '../../utils/api.electron'

/**
 * About Component
 */
class About extends React.Component {
  static propTypes = {
    /**
     * styles for this component
     */
    classes: PropTypes.object.isRequired,
    /**
     * theme used generally in App
     */
    theme: PropTypes.object.isRequired,
    /**
     * gets current translation
     */
    t: PropTypes.func.isRequired,
    /**
     * used for navigation
     */
    history: PropTypes.object.isRequired
  }

  /**
   * this is constructor description.
   * @param {object} props passed to component
   */
  constructor (props) {
    super()

    this.openIssuesLink = this.openIssuesLink.bind(this)
    this.openAppLink = this.openAppLink.bind(this)
    this.onClickHome = this.onClickHome.bind(this)
  }

  /**
   * Redirects to Main component.
   */
  onClickHome () {
    this.props.history.push('/')
  }

  /**
   * Open link for reporting issues in browser.
   */
  openIssuesLink () {
    openExternalLink(packageJson.bugs.url)
  }

  /**
   * Open link for the app in browser.
   */
  openAppLink () {
    openExternalLink(packageJson.repository.url)
  }

  /**
   * Rendering method
   */
  render () {
    const { classes, t } = this.props
    return (
      <Slide in direction='left'>
        <div className={classes.root}>
          <img
            className={classes.img}
            src={require('../../assets/images/Deer-256.png')} />
          <div className={classes.content}>
            <Typography variant='h3'>
              {packageJson.productName}
            </Typography>
            <Typography variant='body1'>
              {packageJson.version}
            </Typography>
            <Typography variant='body2'>
              {os.type()} {os.arch()}
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant='body1'>
              {packageJson.description}
            </Typography>
            <Typography variant='body2'>
              {t('about:copyright')} © 2017 – {(new Date()).getFullYear()}
              {' '}{t('about:forAuthors')}
            </Typography>
            <Typography variant='body2'>
              {t('about:license', { license: packageJson.license })}
            </Typography>
            <Typography variant='body2'>
              {t('about:WantHelp')}
              <span className={classes.link} onClick={this.openIssuesLink}>
                {t('about:reportIssue')}
              </span>
              {t('about:or')}
              <span className={classes.link} onClick={this.openAppLink}>
                {t('about:contribute')}
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
export default withTheme()(withStyles(Styles)(About))
