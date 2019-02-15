import React from 'react'
import PropTypes from 'prop-types'

import Grow from '@material-ui/core/Grow'
import Styles from './style'

// UI wrappers.
import { withStyles, withTheme } from '@material-ui/core/styles'

import ReactQuill from 'react-quill'

import 'react-quill/dist/quill.snow.css'

/**
 * NoteEditor Component
 */
class NoteEditor extends React.Component {
  static propTypes = {
    /**
     * save changes for current note
     */
    saveNote: PropTypes.func.isRequired,
    /**
     * content of active note
     */
    activeNoteContent: PropTypes.string.isRequired,
    /**
     * update current note content
     */
    updateActiveNoteContent: PropTypes.func.isRequired,
    /**
     * update current note title
     */
    updateNoteTitle: PropTypes.func.isRequired,
    /**
     * gets current translation
     */
    t: PropTypes.func.isRequired,
    /**
     * styles for this component
     */
    classes: PropTypes.object.isRequired,
    /**
     * theme used generally in App
     */
    theme: PropTypes.object.isRequired
  }

  /**
   * this is constructor description.
   * @param {object} props passed to component
   */
  constructor (props) {
    super()

    this.title = ''
    this.handleChange = this.handleChange.bind(this)

    this.modules = {
      toolbar: [
        [{ 'header': '1' }, { 'header': '2' }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [{ 'align': [] }, { 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
          { 'indent': '-1' }, { 'indent': '+1' }, { 'direction': 'rtl' }],
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

  /**
   * Called when there is a change in content of current note
   */
  handleChange (content, delta, source, editor) {
    this.props.updateActiveNoteContent(content)

    // We only save first 40 characters of the first non-empty line if there
    // is a change.
    const newTitle =
      editor.getText(0, 40).trim().split('\u000A')[0].substring(0, 40)

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

  /**
   * called before un-mounting component.
   */
  componentWillUnmount () {
    clearTimeout(this.saveTimer)
  }

  /**
   * Rendering method
   */
  render () {
    const { classes, t } = this.props
    return (
      <Grow in>
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
export default withTheme()(withStyles(Styles)(NoteEditor))
