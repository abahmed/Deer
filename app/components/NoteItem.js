import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NoteItem extends Component {
  constructor (props) {
    // Initialize this using super
    super()

    this.onNoteClick = this.onNoteClick.bind(this)
  }

  onNoteClick () {
    this.props.select(this.props.id)
  }

  render () {
    const title = this.props.value || 'Empty note'

    let classNames = 'list-group-item list-group-item-action noteItem'
    if (this.props.isActive) { classNames += ' active text-white' }

    return (
      <a className={classNames} onClick={this.onNoteClick}>
        {title}
      </a>
    )
  }
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
}
