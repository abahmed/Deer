import React from 'react'
import { shallow } from 'enzyme'
import Dashboard from './dashboard'

describe('<Dashboard />', () => {
  describe('render()', () => {
    test('renders the dashboard component', () => {
      const wrapper = shallow(<Dashboard />)
      expect(wrapper.exists()).toBe(true)
    })
  })
})
