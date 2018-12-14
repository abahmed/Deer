import React, { Component } from 'react'
import { EditorState } from 'draft-js'
import { Editor }  from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
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

  componentDidMount () {
    // Enable delete button as editor is mounted.
    this.props.setDeleteDisabled(false)
  }

  componentWillUnmount () {
    // Disable save and delete buttons as editor will be unmounted.
    this.props.setSaveDisabled(true)
    this.props.setDeleteDisabled(true)
    this.props.updateActiveNoteState(EditorState.createEmpty())
  }

  render () {
    const { t } = this.props
    return (
      <div>
        <Editor
          editorState={this.props.activeNoteState}
          onEditorStateChange={this.onEditorChange}
          placeholder={t('noteEditor:placeholder')}
          toolbarClassName='NoteEditor-toolbar'
          editorClassName='NoteEditor'
          toolbar={{
            options: ['inline', 'textAlign', 'list', 'blockType'],
            blockType: {
              options: ['H1', 'H2', 'H3', 'Blockquote', 'Code'],
              inDropdown: false 
            }
          }}
        />
      </div>
    )
  }
}

NoteEditor.propTypes = {
  activeNoteState: PropTypes.object.isRequired,
  setSaveDisabled: PropTypes.func.isRequired,
  setDeleteDisabled: PropTypes.func.isRequired,
  setNewNoteDisabled: PropTypes.func.isRequired,
  updateActiveNoteState: PropTypes.func.isRequired,
  updateNoteTitle: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}
