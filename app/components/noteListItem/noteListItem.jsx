import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import DeleteIcon from '@material-ui/icons/Delete'
import Styles from './style'

// UI wrappers.
import { withStyles, withTheme } from '@material-ui/core/styles'

/**
 * NoteListItem Component
 */
class NoteListItem extends React.Component {
  static propTypes = {
    /**
     * id of current item
     */
    id: PropTypes.string.isRequired,
    /**
     * text will be shown in this item
     */
    text: PropTypes.string,
    /**
     * Modification date of this item
     */
    modified: PropTypes.number,
    /**
     * is current item selected or not
     */
    selected: PropTypes.bool.isRequired,
    /**
     * callback called when user clicks on this item
     */
    onClick: PropTypes.func.isRequired,
    /**
     * callback called when user clicks on delete button
     */
    onDelete: PropTypes.func.isRequired,
    /**
     * styles for this component
     */
    classes: PropTypes.object.isRequired,
    /**
     * theme used generally in App
     */
    theme: PropTypes.object.isRequired
  }

  /**
   * this is constructor description.
   * @param {object} props passed to component
   */
  constructor (props) {
    super()

    this.onClick = this.onClick.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  /**
   * Called when user clicks on this item
   */
  onClick () {
    this.props.onClick(this.props.id)
  }

  /**
   * Called when user clicks on delete button
   */
  onDeleteClick () {
    this.props.onDelete()
  }

  /**
   * Rendering method
   */
  render () {
    const { classes } = this.props
    const text = this.props.text || 'Empty note'
    const modified = this.props.modified ? moment(this.props.modified).format('llll') : ''
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
        onClick={this.onClick}
      >
        <ListItemText
          classes={{
            primary: classes.listItemText,
            secondary: classes.listItemText
          }}
          className={classes.listItemText}
          primary={text}
          secondary={modified}
        />
        <ListItemSecondaryAction>
          {this.props.selected ? (
            <IconButton color='primary' onClick={this.onDeleteClick}>
              <DeleteIcon />
            </IconButton>
          ) : (
            ''
          )}
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}
export default withTheme()(withStyles(Styles)(NoteListItem))
