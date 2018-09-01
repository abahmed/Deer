import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NoteEditor from './../containers/NoteEditor'

export default class HomeContent extends Component {
  render () {
    // Show homeContent when no note is selected.
    if (this.props.activeNoteIndex >= 0) { return (<NoteEditor />) }

    return (
      <div className='center-text middle-page'>
        <h4>Please select a note or add a new one</h4>
      </div>
    )
  }
}

HomeContent.propTypes = {
  activeNoteIndex: PropTypes.number.isRequired
}
