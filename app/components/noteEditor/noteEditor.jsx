import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Grow from '@material-ui/core/Grow'
import Styles from './style'

// UI wrappers.
import { withStyles } from '@material-ui/core/styles'
import { withTheme } from '@material-ui/core/styles'

import ReactQuill from 'react-quill'

import 'react-quill/dist/quill.snow.css'

class NoteEditor extends Component {
  constructor (props) {
    super()

    this.title = ''
    this.handleChange = this.handleChange.bind(this)

    this.modules = {
      toolbar: [
        [{ 'header': '1'}, {'header': '2'}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [{ 'align': [] }, { 'color': [] }, { 'background': [] }],
        [{'list': 'ordered'}, {'list': 'bullet'},
         {'indent': '-1'}, {'indent': '+1'}, { 'direction': 'rtl' }],
        ['image'],
        ['clean']
      ],
      clipboard: {
        matchVisual: false
      }
    }

    this.formats = [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
      'list', 'bullet', 'indent',
      'color', 'background',
      'align', 'direction',
      'link', 'image', 'video'
    ]

    this.saveTimer = null
  }

  handleChange (content, delta, source, editor) {
    this.props.updateActiveNoteContent(content)

    // We only save first 40 characters of the first non-empty line if there
      // is a change.
    const newTitle =
      editor.getText(0, 40).trim().split('\u000A')[0].substring(0, 40)

    //this.setState(newState)
    if (newTitle !== this.title) {
      this.props.updateNoteTitle(newTitle)
      this.title = newTitle
    }

    // There is a change in content
    if (this.saveTimer) {
      clearTimeout(this.saveTimer)
    }
    this.saveTimer = setTimeout(() => {
      this.props.saveNote()
    }, 750)
  }


  componentWillUnmount () {
    clearTimeout(this.saveTimer)
  }

  render () {
    const { classes, t } = this.props
    return (
      <Grow in={true}>
        <div className={classes.root}>
          <ReactQuill
            theme='snow'
            className={classes.editor}
            onChange={this.handleChange}
            value={this.props.activeNoteContent}
            modules={this.modules}
            formats={this.formats}
            placeholder={t('noteEditor:placeholder')}
          />
        </div>
      </Grow>
    )
  }
}

NoteEditor.propTypes = {
  saveNote: PropTypes.func.isRequired,
  activeNoteContent: PropTypes.string.isRequired,
  updateActiveNoteContent: PropTypes.func.isRequired,
  updateNoteTitle: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}
export default withTheme()(withStyles(Styles)(NoteEditor))