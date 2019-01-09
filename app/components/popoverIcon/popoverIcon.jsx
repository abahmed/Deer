import React from 'react'
import PropTypes from 'prop-types'

import Popover from '@material-ui/core/Popover'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Styles from './style'

// UI wrappers.
import { withStyles } from '@material-ui/core/styles'
import { withTheme } from '@material-ui/core/styles'

class PopoverIcon extends React.Component {
  constructor (props) {
    super()

    this.state = {
      anchorEl: null
    }

    this.handlePopoverOpen = this.handlePopoverOpen.bind(this)
    this.handlePopoverClose = this.handlePopoverClose.bind(this)
  }

  handlePopoverOpen (event) {
    this.setState({ anchorEl: event.currentTarget })
  }

  handlePopoverClose () {
    this.setState({ anchorEl: null })
  }

  render() {
    const { classes } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <div className={classes.root}>
        <IconButton
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
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
            paper: classes.paper,
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
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

PopoverIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired
}

export default withTheme()(withStyles(Styles)(PopoverIcon))