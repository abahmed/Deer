import React, { Component } from 'react'
import { Editor } from 'draft-js'
import PropTypes from 'prop-types'
import HomeContent from './HomeContent'

export default class NoteEditor extends Component {
  render () {
    // Show homeContent when no note is selected.
    if (!this.props.activeNote) { return (<HomeContent />) }

    return (
      <div className='NoteEditor'>
        <Editor
          editorState={this.props.editorState}
          onChange={this.props.onSaveEditorState}
          placeholder='Write down your thoughts...'
        />
      </div>
    )
  }
}

NoteEditor.propTypes = {
  activeNote: PropTypes.string.isRequired,
  onSaveEditorState: PropTypes.func.isRequired,
  editorState: PropTypes.object.isRequired
}
