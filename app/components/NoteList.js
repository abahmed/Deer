import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NoteItem from './NoteItem'

export default class NoteList extends Component {
  componentDidMount () {
    // Trigger fetching notes as this component is loaded.
    this.props.fetchAllNotes()
  }

  render () {
    return (
      <div className='list-group list-group-flush'>
        {this.props.notes.map((note, index) => (
          <NoteItem key={index} value={note} />
        ))}
      </div>
    )
  }
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
  fetchAllNotes: PropTypes.func.isRequired
}
