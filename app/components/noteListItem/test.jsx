import React from 'react'
import { shallow } from 'enzyme'
import NoteListItem from './noteListItem'

describe('<Welcome />', () => {
  describe('render()', () => {
    test('renders the noteListItem component', () => {
      const wrapper = shallow(<NoteListItem />)
      expect(wrapper.exists()).toBe(true)
    })
  })
})
