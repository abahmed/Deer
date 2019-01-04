import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Badge from '@material-ui/core/Badge'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

// UI wrappers.
import { withStyles } from '@material-ui/core/styles'
import { withTheme } from '@material-ui/core/styles'
import Styles from './style'


class SidebarItem extends Component {
  constructor (props) {
    super()

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.callback(this.props.id)
  }

  render () {
    const { classes } = this.props
    return (
      <Badge
        badgeContent={this.props.badgeCount}
        invisible={this.props.badgeCount <= 0}
        color='primary'
        className={classes.flexDisplay}
        classes={{ badge: classes.badge }}>
        <ListItem
          button
          color='primary'
          className={classes.listItem}
          classes={{
            root: classes.listItemRoot,
            selected: classes.selected
          }}
          selected={this.props.selected}
          onClick={this.handleClick}>
          <ListItemIcon
            className={classes.listItemIcon}>
            {this.props.icon}
          </ListItemIcon>
          <ListItemText
            className={classes.listItemText}
            primary={this.props.text} />
      </ListItem>
      </Badge>
    )
  }
}

SidebarItem.propTypes = {
  id: PropTypes.number.isRequired,
  badgeCount: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}
export default withTheme()(withStyles(Styles)(SidebarItem))