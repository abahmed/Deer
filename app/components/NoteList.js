import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NoteItem from './NoteItem'

export default class NoteList extends Component {
  constructor (props) {
    // Initialize this using super
    super()

    this.onSelect = this.onSelect.bind(this)
  }

  componentDidMount () {
    // Trigger fetching notes as this component is loaded.
    this.props.fetchAllNotes()
  }

  onSelect (noteId = '') {
    // Do nothing as it's already selected.
    if (this.props.activeNote === noteId) { return }

    this.props.setActiveNote(noteId)
  }

  render () {
    return (
      <div className='list-group list-group-flush'>
        {this.props.notes.map((note, index) => (
          <NoteItem
            key={index}
            id={note._id}
            value={note.title}
            select={this.onSelect}
            isActive={this.props.activeNote === note._id} />
        ))}
      </div>
    )
  }
}

NoteList.propTypes = {
  activeNote: PropTypes.string.isRequired,
  notes: PropTypes.array.isRequired,
  fetchAllNotes: PropTypes.func.isRequired,
  setActiveNote: PropTypes.func.isRequired
}
