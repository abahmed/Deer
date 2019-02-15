import React from 'react'
import { shallow } from 'enzyme'
import NoteList from './noteList'

import { unwrap } from '@material-ui/core/test-utils'

const UNoteList = unwrap(NoteList)
const noteListObj = new UNoteList()

describe('<NoteList />', () => {
  describe('render()', () => {
    test('renders the noteList component', () => {
      const wrapper = shallow(<NoteList />)
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('props', () => {
    test('selectedIndex', () => {
      expect(noteListObj.state.selectedIndex).toEqual(0)
    })
  })
})
