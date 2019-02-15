import React from 'react'
import { shallow } from 'enzyme'
import Home from './home'

describe('<Home />', () => {
  describe('render()', () => {
    test('renders the home component', () => {
      const wrapper = shallow(<Home />)
      expect(wrapper.exists()).toBe(true)
    })
  })
})
