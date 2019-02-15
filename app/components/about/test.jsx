import React from 'react'
import { shallow } from 'enzyme'
import About from './about'

describe('<About />', () => {
  describe('render()', () => {
    test('renders the about component', () => {
      const wrapper = shallow(<About />)
      expect(wrapper.exists()).toBe(true)
    })
  })
})
