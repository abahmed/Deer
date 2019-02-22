import React from 'react'
import { shallow } from 'enzyme'
import NotesPanel from './notesPanel'

describe('<NotesPanel />', () => {
  describe('render()', () => {
    test('renders the notesPanel component', () => {
      const wrapper = shallow(<NotesPanel />)
      expect(wrapper.exists()).toBe(true)
    })
  })
})
