import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import App from '../../app/components/App'

jest.mock('../../__mocks__/electron')

describe('<App />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<App />)
      const component = wrapper.dive()

      expect(toJson(component)).toMatchSnapshot()
    })
  })
})
