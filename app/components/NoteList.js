import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NoteList extends Component {
  componentDidMount () {
    // Trigger fetching notes as this component is loaded.
    this.props.fetchAllNotes()
  }

  render () {
    return (
      <div className='list-group list-group-flush' />
    )
  }
}

NoteList.propTypes = {
  fetchAllNotes: PropTypes.func.isRequired
}
