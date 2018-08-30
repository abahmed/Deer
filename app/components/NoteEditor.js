import React, { Component } from 'react'
import { Editor } from 'draft-js'
import PropTypes from 'prop-types'

export default class NoteEditor extends Component {
  render () {
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
  onSaveEditorState: PropTypes.func.isRequired,
  editorState: PropTypes.object.isRequired
}
