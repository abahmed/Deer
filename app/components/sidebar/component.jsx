import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SidebarItem from '../sidebarItem'

import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import NotesIcon from '@material-ui/icons/Notes'

// UI wrappers.
import { withStyles } from '@material-ui/core/styles'
import { withTheme } from '@material-ui/core/styles'

import Styles from './style'

class Sidebar extends Component {
  constructor (props) {
    super()
    this.state = {
      selectedIndex: 0
    }

    this.handleListItemClick = this.handleListItemClick.bind(this)
  }

  handleListItemClick (index) {
    this.setState({ selectedIndex: index })
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <List component="nav" className={classes.list} />
      </div>
    )
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}
export default withTheme()(withStyles(Styles)(Sidebar))