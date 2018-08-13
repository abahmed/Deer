import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NoteItem extends Component {
  render () {
    let title = this.props.value.title || 'Empty note'
    return (
      <a
        className='list-group-item list-group-item-action noteItem'>
        {title}
      </a>
    )
  }
}

NoteItem.propTypes = {
  value: PropTypes.object.isRequired
}
