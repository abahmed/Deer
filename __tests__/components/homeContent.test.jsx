import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import HomeContent from '../../app/components/HomeContent'

jest.mock('../../__mocks__/electron')

const defaultProps = {
  activeNoteIndex: -1,
  t: (key) => key,
  notes: []
}

describe('<HomeContent />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const props = { ...defaultProps, notes: [{}] }
      const wrapper = shallow(<HomeContent {...props} />)

      expect(toJson(wrapper)).toMatchSnapshot()
    })

    test('renders the component with empty notes list', () => {
      const wrapper = shallow(<HomeContent {...defaultProps} />)

      expect(toJson(wrapper)).toMatchSnapshot()
    })
  })
})
