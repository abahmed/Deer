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

  onSelect (noteIndex = -1) {
    // Do nothing as it's already selected.
    if (this.props.activeNoteIndex === noteIndex) { return }

    this.props.setActiveNoteIndex(noteIndex)
    // this.props.fetchNote(noteIndex)
  }

  render () {
    return (
      <div className='list-group list-group-flush'>
        {this.props.notes.map((note, index) => (
          <NoteItem
            key={index}
            index={index}
            value={note.title}
            select={this.onSelect}
            isActive={this.props.activeNoteIndex === index} />
        ))}
      </div>
    )
  }
}

NoteList.propTypes = {
  activeNoteIndex: PropTypes.number.isRequired,
  notes: PropTypes.array.isRequired,
  fetchAllNotes: PropTypes.func.isRequired,
  setActiveNoteIndex: PropTypes.func.isRequired
}
