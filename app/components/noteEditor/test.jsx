import React from 'react'
import { shallow } from 'enzyme'
import NoteEditor from './noteEditor'

import { unwrap } from '@material-ui/core/test-utils'

const UNoteEditor = unwrap(NoteEditor)
const noteEditorObj = new UNoteEditor()

describe('<NoteEditor />', () => {
  describe('render()', () => {
    test('renders the noteEditor component', () => {
      const wrapper = shallow(<NoteEditor />)
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('props', () => {
    test('title', () => {
      expect(noteEditorObj.title).toEqual('')
    })
  })
})
