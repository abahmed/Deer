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
     * content of selected note
     */
    selectedNoteContent: PropTypes.string.isRequired,
    /**
     * update current note
     */
    editSelectedNote: PropTypes.func.isRequired,
    /**
     * save changes for current note
     */
    saveSelectedNote: PropTypes.func.isRequired,
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

    this.handleChange = this.handleChange.bind(this)

    this.modules = {
      toolbar: [
        [{ header: '1' }, { header: '2' }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [{ align: [] }, { color: [] }, { background: [] }],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
          { direction: 'rtl' }
        ],
        ['image'],
        ['clean']
      ],
      clipboard: {
        matchVisual: false
      }
    }

    this.formats = [
      'header',
      'font',
      'size',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'code-block',
      'list',
      'bullet',
      'indent',
      'color',
      'background',
      'align',
      'direction',
      'link',
      'image'
    ]

    this.saveTimer = null
  }

  /**
   * Called when there is a change in content of current note
   */
  handleChange (content, delta, source, editor) {
    // We only save first 40 characters of the first non-empty line if there
    // is a change.
    const newTitle = editor
      .getText(0, 40)
      .trim()
      .split('\u000A')[0]
      .substring(0, 40)

    this.props.editSelectedNote(newTitle, content, Date.now())

    // There is a change in content
    if (this.saveTimer) {
      clearTimeout(this.saveTimer)
    }
    this.saveTimer = setTimeout(() => {
      this.props.saveSelectedNote()
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
            value={this.props.selectedNoteContent}
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
