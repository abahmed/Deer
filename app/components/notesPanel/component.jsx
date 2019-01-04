import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Sidebar from '../sidebar'
import NoteList from '../noteList'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import NoteAddIcon from '@material-ui/icons/NoteAdd'


import Drawer from '@material-ui/core/Drawer'

// UI wrappers.
import { withStyles } from '@material-ui/core/styles'
import { withTheme } from '@material-ui/core/styles'

import Styles from './style'


class NotesPanel extends Component {
  constructor (props) {
    super()

    this.state = {
      drawer: false
    }

    this.toggleDrawer = this.toggleDrawer.bind(this)
  }

  toggleDrawer () {
    this.setState({
      drawer: !this.state.drawer
    })
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
         <AppBar position='static' color='default'>
          <Toolbar variant='dense'>
            <IconButton
              color='primary'
              className={classes.menuButton}
              onClick={this.toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <IconButton
              color='primary'
              className={classes.noteAddButton}>
              <NoteAddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <NoteList />
        <Drawer open={this.state.drawer}  onClose={this.toggleDrawer}>
          <Sidebar />
        </Drawer>
      </div>
    )
  }
}

NotesPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}
export default withTheme()(withStyles(Styles)(NotesPanel))