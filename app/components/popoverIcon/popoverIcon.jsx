import React from 'react'
import PropTypes from 'prop-types'

import Popover from '@material-ui/core/Popover'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Styles from './style'

// UI wrappers.
import { withStyles, withTheme } from '@material-ui/core/styles'

/**
 * PopoverIcon Component
 */
class PopoverIcon extends React.Component {
  static propTypes = {
    /**
     * styles for this component
     */
    classes: PropTypes.object.isRequired,
    /**
     * icon that will be shown
     */
    icon: PropTypes.element.isRequired,
    /**
     * shown when user hovers on this component
     */
    text: PropTypes.string.isRequired,
    /**
     * called when user clicks on this component
     */
    callback: PropTypes.func.isRequired
  }

  /**
   * this is constructor description.
   * @param {object} props passed to component
   */
  constructor (props) {
    super()

    this.state = {
      anchorEl: null
    }

    this.handlePopoverOpen = this.handlePopoverOpen.bind(this)
    this.handlePopoverClose = this.handlePopoverClose.bind(this)
  }

  /**
   * Called when user hovers on component to show popover
   */
  handlePopoverOpen (event) {
    this.setState({ anchorEl: event.currentTarget })
  }

  /**
   * Called when user hovers on component to hide popover
   */
  handlePopoverClose () {
    this.setState({ anchorEl: null })
  }

  /**
   * Rendering method
   */
  render () {
    const { classes } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <div className={classes.root}>
        <IconButton
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup='true'
          onMouseEnter={this.handlePopoverOpen}
          onMouseLeave={this.handlePopoverClose}
          onClick={this.props.callback}
          color='primary'>
          {this.props.icon}
        </IconButton>
        <Popover
          id='mouse-over-popover'
          className={classes.popover}
          classes={{
            paper: classes.paper
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          onClose={this.handlePopoverClose}
          disableRestoreFocus
        >
          <Typography>{this.props.text}</Typography>
        </Popover>
      </div>
    )
  }
}
export default withTheme()(withStyles(Styles)(PopoverIcon))
