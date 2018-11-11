import React, { Component } from 'react'
import { IconBold, IconItalic, IconBlockquote, IconBulletedList, IconHyperlink, IconImage } from '../../assets/icons/SVG'

export default class NoteEditorToolbar extends Component {
  constructor (props) {
    super(props)
    // initial state for text style
    this.state = {
      isBold: false,
      isItalics: false,
      isUnderline: false,
      isH2: false,
      isH3: false
    }

    this.toggleItalics = this.toggleItalics.bind(this)
    this.toggleBold = this.toggleBold.bind(this)
    this.toggleUnderline = this.toggleUnderline.bind(this)
    this.toggleH2 = this.toggleH2.bind(this)
    this.toggleH3 = this.toggleH3.bind(this)
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

  toggleH2 () {
    this.setState(prevState => ({
      isH2: !prevState.isH2
    }))
  }

  toggleH3 () {
    this.setState(prevState => ({
      isH3: !prevState.isH3
    }))
  }

  render () {
    return (
      <div>
        <div className='NoteEditor-Toolbar' role='toolbar'>
          <div className='NoteEditor-ToolbarGroup'>
            <button name='BOLD' type='button' tabIndex='-1'
              onClick={this.toggleBold}
              className={
                this.state.isBold ? 'NoteEditor-ToolbarButton NoteEditor-ToolbarButton--active'
                  : 'NoteEditor-ToolbarButton'
              }
            >
              <svg width='16' height='16' viewBox='0 0 1024 1024' className='NoteEditor-Icon'>
                <IconBold />
              </svg>
            </button>
            <button name='ITALIC' type='button' tabIndex='-1'
              onClick={this.toggleItalics}
              className={
                this.state.isItalics ? 'NoteEditor-ToolbarButton NoteEditor-ToolbarButton--active'
                  : 'NoteEditor-ToolbarButton'
              }
            >
              <svg width='16' height='16' viewBox='0 0 1024 1024' className='NoteEditor-Icon'>
                <IconItalic />
              </svg>
            </button>
            <button name='UNDERLINE' type='button' tabIndex='-1'
              onClick={this.toggleUnderline}
              className={
                this.state.isUnderline ? 'NoteEditor-ToolbarButton NoteEditor-ToolbarButton--active'
                  : 'NoteEditor-ToolbarButton'
              }
            >
              <span className='NoteEditor-ToolbarButton__label'><u>U</u></span>
            </button>
          </div>
          <div className='NoteEditor-ToolbarGroup'>
            <button name='header-two' type='button' tabIndex='-1'
              onClick={this.toggleH2}
              className={
                this.state.isH2 ? 'NoteEditor-ToolbarButton NoteEditor-ToolbarButton--active'
                  : 'NoteEditor-ToolbarButton'
              }
            >
              <span className='NoteEditor-ToolbarButton__label'>H2</span>
            </button>
            <button name='header-three' type='button' tabIndex='-1'
              onClick={this.toggleH3}
              className={
                this.state.isH3 ? 'NoteEditor-ToolbarButton NoteEditor-ToolbarButton--active'
                  : 'NoteEditor-ToolbarButton'
              }
            >
              <span className='NoteEditor-ToolbarButton__label'>H3</span>
            </button>
            <button name='blockquote' className='NoteEditor-ToolbarButton' type='button' tabIndex='-1'>
              <svg width='16' height='16' viewBox='0 0 1024 1024' className='NoteEditor-Icon'>
                <IconBlockquote />
              </svg>
            </button>
            <button name='code-block' className='NoteEditor-ToolbarButton' type='button' tabIndex='-1'>
              <span className='NoteEditor-ToolbarButton__label'>{ '{ ' + '}' }</span>
            </button>
            <button name='unordered-list-item' className='NoteEditor-ToolbarButton' type='button' tabIndex='-1'>
              <svg width='16' height='16' viewBox='0 0 1024 1024' className='NoteEditor-Icon'>
                <IconBulletedList />
              </svg>
            </button>
          </div>
          <div className='NoteEditor-ToolbarGroup'>
            <button name='HORIZONTAL_RULE' className='NoteEditor-ToolbarButton' type='button' tabIndex='-1'>
              <span className='NoteEditor-ToolbarButton__label'>―</span>
            </button>
            <button name='BR' className='NoteEditor-ToolbarButton' type='button' tabIndex='-1'>
              <svg width='16' height='16' viewBox='0 0 1024 1024' className='NoteEditor-Icon'>
                <path d='M.436 633.471l296.897-296.898v241.823h616.586V94.117h109.517v593.796H297.333v242.456z' />
              </svg>
            </button>
          </div>
          <div className='NoteEditor-ToolbarGroup'>
            <button name='LINK' className='NoteEditor-ToolbarButton' type='button' tabIndex='-1'>
              <svg width='16' height='16' viewBox='0 0 1024 1024' className='NoteEditor-Icon'>
                <IconHyperlink />
              </svg>
            </button>
            <button name='IMAGE' className='NoteEditor-ToolbarButton' type='button' tabIndex='-1'>
              <svg width='16' height='16' viewBox='0 0 1024 1024' className='NoteEditor-Icon'>
                <IconImage />
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }
}
