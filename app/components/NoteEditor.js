import React, { Component } from 'react'
import { Editor, EditorState } from 'draft-js'
import PropTypes from 'prop-types'

export default class NoteEditor extends Component {
  constructor (props) {
    // Initialize this using super
    super()

    this.onEditorChange = this.onEditorChange.bind(this)
  }

  onEditorChange (newEditorState) {
    const currentContent = this.props.activeNoteState.getCurrentContent()
    const newContent = newEditorState.getCurrentContent()
    if (currentContent !== newContent) {
      // We only save first 40 characters of the first non-empty line if there
      // is a change.
      const currentText =
        currentContent.getPlainText().trim().split('\u000A')[0].substring(0, 40)
      const newText =
        newContent.getPlainText().trim().split('\u000A')[0].substring(0, 40)
      if (currentText !== newText) { this.props.updateNoteTitle(newText) }

      // There is a change in content
      if (newContent.hasText() && newText.trim()) {
        // The new content has text, so we will enable save button.
        this.props.setSaveDisabled(false)
      } else {
        // The new content is empty, so we will disable new Note and save
        // buttons.
        this.props.setNewNoteDisabled(true)
        this.props.setSaveDisabled(true)
      }
    }

    this.props.updateActiveNoteState(newEditorState)
  }

  componentWillUnmount () {
    // Disable save button as editor will be unmounted.
    this.props.setSaveDisabled(true)
    this.props.updateActiveNoteState(EditorState.createEmpty())
  }

  render () {
    return (
      <div className='NoteEditor'>
        <Editor
          editorState={this.props.activeNoteState}
          onChange={this.onEditorChange}
          placeholder='Write down your thoughts...'
        />
      </div>
    )
  }
}

NoteEditor.propTypes = {
  activeNoteState: PropTypes.object.isRequired,
  setSaveDisabled: PropTypes.func.isRequired,
  setNewNoteDisabled: PropTypes.func.isRequired,
  updateActiveNoteState: PropTypes.func.isRequired,
  updateNoteTitle: PropTypes.func.isRequired
}
