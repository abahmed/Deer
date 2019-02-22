import React from 'react'
import { shallow } from 'enzyme'
import NoteList from './noteList'

describe('<NoteList />', () => {
  describe('render()', () => {
    test('renders the noteList component', () => {
      const wrapper = shallow(<NoteList />)
      expect(wrapper.exists()).toBe(true)
    })
  })
})
