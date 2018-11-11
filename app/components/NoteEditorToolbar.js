import React, { Component } from 'react'

export default class NoteEditorToolbar extends Component {
  constructor (props) {
    super(props)
    // initial state for text style
    this.state = {
      isBold: false,
      isItalics: false,
      isUnderline: false
    }

    this.toggleItalics = this.toggleItalics.bind(this)
    this.toggleBold = this.toggleBold.bind(this)
    this.toggleUnderline = this.toggleUnderline.bind(this)
  }

  toggleItalics () {
    this.setState(prevState => ({
      isItalics: !prevState.isItalics
    }))
  }

  toggleBold () {
    this.setState(prevState => ({
      isBold: !prevState.isBold
    }))
  }

  toggleUnderline () {
    this.setState(prevState => ({
      isUnderline: !prevState.isUnderline
    }))
  }

  render () {
    return (
      <div>
        <div className='NoteEditor-Toolbar' role='toolbar'>
          <div className='NoteEditor-ToolbarGroup'>
            <button name='BOLD'
              onClick={this.toggleBold}
              className={
                this.state.isBold ? 'NoteEditor-ToolbarButton NoteEditor-ToolbarButton--active'
                  : 'NoteEditor-ToolbarButton'
              }
              type='button' aria-label='Bold Ctrl + B' data-draftail-balloon='true' tabIndex='-1'>
              <svg width='16' height='16' viewBox='0 0 1024 1024' className='NoteEditor-Icon ' aria-hidden='true'>
                <svg id='icon-bold' viewBox='0 0 32 32' width='100%' height='100%'>
                  <path d='M22.121 15.145c1.172-1.392 1.879-3.188 1.879-5.145 0-4.411-3.589-8-8-8h-10v28h12c4.411 0 8-3.589 8-8 0-2.905-1.556-5.453-3.879-6.855zM12 6h3.172c1.749 0 3.172 1.794 3.172 4s-1.423 4-3.172 4h-3.172v-8zM16.969 26h-4.969v-8h4.969c1.827 0 3.313 1.794 3.313 4s-1.486 4-3.313 4z' />
                </svg>
              </svg>
            </button>
            <button name='ITALIC'
              onClick={this.toggleItalics}
              className={
                this.state.isItalics ? 'NoteEditor-ToolbarButton NoteEditor-ToolbarButton--active'
                  : 'NoteEditor-ToolbarButton'
              }
              type='button' aria-label='Italic Ctrl + I' data-draftail-balloon='true' tabIndex='-1'>
              <svg width='16' height='16' viewBox='0 0 1024 1024' className='NoteEditor-Icon ' aria-hidden='true'>
                <svg id='icon-italic' viewBox='0 0 32 32' width='100%' height='100%'>
                  <path d='M28 2v2h-4l-10 24h4v2h-14v-2h4l10-24h-4v-2z' />
                </svg>
              </svg>
            </button>
            <button name='UNDERLINE'
              onClick={this.toggleUnderline}
              className={
                this.state.isUnderline ? 'NoteEditor-ToolbarButton NoteEditor-ToolbarButton--active'
                  : 'NoteEditor-ToolbarButton'
              } type='button' aria-label='Underline' data-draftail-balloon='true' tabIndex='-1'>
              <span className='NoteEditor-ToolbarButton__label'><u>U</u></span>
            </button>
          </div>
          <div className='NoteEditor-ToolbarGroup'>
            <button name='header-two' className='NoteEditor-ToolbarButton' type='button'
              aria-label='Heading 2##' data-draftail-balloon='true' tabIndex='-1'>
              <span className='NoteEditor-ToolbarButton__label'>H2</span>
            </button>
            <button name='header-three' className='NoteEditor-ToolbarButton Draftail-ToolbarButton--active' type='button'
              aria-label='Heading 3 ###' tabIndex='-1' data-draftail-balloon='true'>
              <span className='NoteEditor-ToolbarButton__label'>H3</span>
            </button>
            <button name='blockquote' className='NoteEditor-ToolbarButton' type='button'
              aria-label='Blockquote >' data-draftail-balloon='true' tabIndex='-1'>
              <svg width='16' height='16' viewBox='0 0 1024 1024' className='NoteEditor-Icon ' aria-hidden='true'>
                <svg id='icon-openquote' viewBox='0 0 32 32' width='100%' height='100%'>
                  <path d='M7.031 14c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7l-0.031-1c0-7.732 6.268-14 14-14v4c-2.671 0-5.182 1.040-7.071 2.929-0.364 0.364-0.695 0.751-0.995 1.157 0.357-0.056 0.724-0.086 1.097-0.086zM25.031 14c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7l-0.031-1c0-7.732 6.268-14 14-14v4c-2.671 0-5.182 1.040-7.071 2.929-0.364 0.364-0.695 0.751-0.995 1.157 0.358-0.056 0.724-0.086 1.097-0.086z' />
                </svg>
              </svg>
            </button>
            <button name='code-block' className='NoteEditor-ToolbarButton' type='button'
              aria-label='Code block ```' data-draftail-balloon='true' tabIndex='-1'>
              <span className='NoteEditor-ToolbarButton__label'>{ }</span>
            </button>
            <button name='unordered-list-item' className='NoteEditor-ToolbarButton' type='button'
              aria-label='Bulleted list-' data-draftail-balloon='true' tabIndex='-1'>
              <svg width='16' height='16' viewBox='0 0 1024 1024' className='NoteEditor-Icon ' aria-hidden='true'>
                <svg id='icon-list-ul' viewBox='0 0 32 32' width='100%' height='100%'>
                  <path d='M0 0h8v8h-8zM12 2h20v4h-20zM0 12h8v8h-8zM12 14h20v4h-20zM0 24h8v8h-8zM12 26h20v4h-20z' />
                </svg>
              </svg>
            </button>
          </div>
          <div className='NoteEditor-ToolbarGroup'>
            <button name='HORIZONTAL_RULE' className='NoteEditor-ToolbarButton' type='button'
              aria-label='Horizontal line - - -' data-draftail-balloon='true' tabIndex='-1'>
              <span className='NoteEditor-ToolbarButton__label'>―</span>
            </button>
            <button name='BR' className='NoteEditor-ToolbarButton' type='button'
              aria-label='Line break ⇧ + ↵' data-draftail-balloon='true' tabIndex='-1'>
              <svg width='16' height='16' viewBox='0 0 1024 1024' className='NoteEditor-Icon ' aria-hidden='true'>
                <path d='M.436 633.471l296.897-296.898v241.823h616.586V94.117h109.517v593.796H297.333v242.456z' />
              </svg>
            </button>
          </div>
          <div className='NoteEditor-ToolbarGroup'>
            <button name='LINK' className='NoteEditor-ToolbarButton' type='button'
              aria-label='Link Ctrl + K' data-draftail-balloon='true' tabIndex='-1'>
              <svg width='16' height='16' viewBox='0 0 1024 1024' className='NoteEditor-Icon ' aria-hidden='true'>
                <svg id='icon-link' viewBox='0 0 32 32' width='100%' height='100%'>
                  <path d='M13.757 19.868c-0.416 0-0.832-0.159-1.149-0.476-2.973-2.973-2.973-7.81 0-10.783l6-6c1.44-1.44 3.355-2.233 5.392-2.233s3.951 0.793 5.392 2.233c2.973 2.973 2.973 7.81 0 10.783l-2.743 2.743c-0.635 0.635-1.663 0.635-2.298 0s-0.635-1.663 0-2.298l2.743-2.743c1.706-1.706 1.706-4.481 0-6.187-0.826-0.826-1.925-1.281-3.094-1.281s-2.267 0.455-3.094 1.281l-6 6c-1.706 1.706-1.706 4.481 0 6.187 0.635 0.635 0.635 1.663 0 2.298-0.317 0.317-0.733 0.476-1.149 0.476z' />
                  <path d='M8 31.625c-2.037 0-3.952-0.793-5.392-2.233-2.973-2.973-2.973-7.81 0-10.783l2.743-2.743c0.635-0.635 1.664-0.635 2.298 0s0.635 1.663 0 2.298l-2.743 2.743c-1.706 1.706-1.706 4.481 0 6.187 0.826 0.826 1.925 1.281 3.094 1.281s2.267-0.455 3.094-1.281l6-6c1.706-1.706 1.706-4.481 0-6.187-0.635-0.635-0.635-1.663 0-2.298s1.663-0.635 2.298 0c2.973 2.973 2.973 7.81 0 10.783l-6 6c-1.44 1.44-3.355 2.233-5.392 2.233z' />
                </svg>
              </svg>
            </button>
            <button name='IMAGE' className='NoteEditor-ToolbarButton' type='button'
              aria-label='Image' data-draftail-balloon='true' tabIndex='-1'>
              <svg width='16' height='16' viewBox='0 0 1024 1024' className='NoteEditor-Icon ' aria-hidden='true'>
                <svg id='icon-image' viewBox='0 0 32 32' width='100%' height='100%'>
                  <path d='M29.996 4c0.001 0.001 0.003 0.002 0.004 0.004v23.993c-0.001 0.001-0.002 0.003-0.004 0.004h-27.993c-0.001-0.001-0.003-0.002-0.004-0.004v-23.993c0.001-0.001 0.002-0.003 0.004-0.004h27.993zM30 2h-28c-1.1 0-2 0.9-2 2v24c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-24c0-1.1-0.9-2-2-2v0z' />
                  <path d='M26 9c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z' />
                  <path d='M28 26h-24v-4l7-12 8 10h2l7-6z' />
                </svg>
              </svg>
            </button>
            <button name='EMBED' className='NoteEditor-ToolbarButton' type='button'
              aria-label='Embed' data-draftail-balloon='true' tabIndex='-1'>
              <span className='icon icon-embed' aria-hidden='true' />
            </button>
          </div>
        </div>
      </div>
    )
  }
}
