import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NoteItem from './NoteItem'

export default class NoteList extends Component {
  constructor (props) {
    // Initialize this using super
    super()

    this.onSelect = this.onSelect.bind(this)
  }

  checkIfItemExists () {
    const currentIndex = this.props.activeNoteIndex

    // WORKAROUND: Unsaved item is unecessary added into notes list - checking by empty revision
    return (currentIndex >= 0 && this.props.notes[currentIndex] && this.props.notes[currentIndex]['rev'])
  }

  componentDidMount () {
    // Trigger fetching notes as this component is loaded.
    this.props.fetchAllNotes()
    const currentIndex = this.props.activeNoteIndex
    if (this.checkIfItemExists()) {
      this.props.fetchNote(currentIndex)
    }
  }

  onSelect (noteIndex = -1) {
    // Do nothing as it's already selected.
    if (this.props.activeNoteIndex === noteIndex) { return }

    this.props.setActiveNoteIndex(noteIndex)
    this.props.fetchNote(noteIndex)
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
  fetchNote: PropTypes.func.isRequired,
  setActiveNoteIndex: PropTypes.func.isRequired
}
