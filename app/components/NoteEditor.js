import React, { Component } from 'react'
import { Editor } from 'draft-js'
import PropTypes from 'prop-types'

export default class NoteEditor extends Component {
  constructor (props) {
    // Initialize this using super
    super()

    this.onEditorChange = this.onEditorChange.bind(this)
  }

  onEditorChange (newEditorState) {
    const currentContent = this.props.editorState.getCurrentContent()
    const newContent = newEditorState.getCurrentContent()
    if (currentContent !== newContent) {
      // There is a change in content
      if (newContent.hasText()) {
        // The new content has text, so we will enable save button.
        this.props.setSaveDisabled(false)
      } else {
        // The new content is empty, so we will disable new Note and save
        // buttons.
        this.props.setNewNoteDisabled(true)
        this.props.setSaveDisabled(true)
      }
    }

    this.props.updateEditorState(newEditorState)
  }

  componentWillUnmount () {
    // Disable save button as editor will be unmounted.
    this.props.setSaveDisabled(true)
  }

  render () {
    return (
      <div className='NoteEditor'>
        <Editor
          editorState={this.props.editorState}
          onChange={this.onEditorChange}
          placeholder='Write down your thoughts...'
        />
      </div>
    )
  }
}

NoteEditor.propTypes = {
  editorState: PropTypes.object.isRequired,
  setSaveDisabled: PropTypes.func.isRequired,
  setNewNoteDisabled: PropTypes.func.isRequired,
  updateEditorState: PropTypes.func.isRequired
}
