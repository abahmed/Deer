import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NoteEditor from './../containers/NoteEditor'

export default class HomeContent extends Component {
  render () {
    const { notes, t } = this.props
    const isAtLeastOneNote = notes.length > 0

    // Show homeContent when no note is selected.
     // Show homeContent when no note is selected.
    if (this.props.activeNoteIndex >= 0 &&
        notes[this.props.activeNoteIndex]) {
      return (<NoteEditor />)
    }

    return (
      <div className='center-text middle-page'>
        <h4>
          {isAtLeastOneNote
            ? t('homeContent:addCreateNote')
            : t('homeContent:thereIsNoNotesYetCreate')}
        </h4>
      </div>
    )
  }
}

HomeContent.propTypes = {
  activeNoteIndex: PropTypes.number.isRequired,
  notes: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired
}
