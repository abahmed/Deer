import React from 'react'
import { shallow } from 'enzyme'
import NoteBook from './notebook'

describe('<NoteBook />', () => {
  describe('render()', () => {
    test('renders the NoteBook component', () => {
      const wrapper = shallow(<NoteBook />)
      expect(wrapper.exists()).toBe(true)
    })
  })
})
