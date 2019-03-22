import React from 'react'
import { shallow } from 'enzyme'
import NoteEditor from './noteEditor'

describe('<NoteEditor />', () => {
  describe('render()', () => {
    test('renders the noteEditor component', () => {
      const wrapper = shallow(<NoteEditor />)
      expect(wrapper.exists()).toBe(true)
    })
  })
})
