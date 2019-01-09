import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import DeleteIcon from '@material-ui/icons/Delete'
import Styles from './style'

// UI wrappers.
import { withStyles } from '@material-ui/core/styles'
import { withTheme } from '@material-ui/core/styles'

class NoteListItem extends Component {
  constructor (props) {
    super()

    this.handleClick = this.handleClick.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  handleClick () {
    this.props.callback(this.props.id)
  }

  onDeleteClick() {
    this.props.onDelete()
  }

  render () {
    const { classes } = this.props
    return (
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
        <ListItemText
          classes={{
            primary:classes.listItemText,
            secondary:classes.listItemText
          }}
          className={classes.listItemText}
          primary={this.props.text} />
        <ListItemSecondaryAction>
          {this.props.selected ?
            <IconButton color='primary' onClick={this.onDeleteClick}>
              <DeleteIcon />
            </IconButton> : ''
          }
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

NoteListItem.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}
export default withTheme()(withStyles(Styles)(NoteListItem))