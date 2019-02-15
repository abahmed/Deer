import React from 'react'
import { shallow } from 'enzyme'
import PopoverIcon from './popoverIcon'

import { unwrap } from '@material-ui/core/test-utils'

const UPopoverIcon = unwrap(PopoverIcon)
const popoverIconObj = new UPopoverIcon()

describe('<PopoverIcon />', () => {
  describe('render()', () => {
    test('renders the popoverIcon component', () => {
      const wrapper = shallow(<PopoverIcon />)
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('props', () => {
    test('anchorEl', () => {
      expect(popoverIconObj.state.anchorEl).toEqual(null)
    })
  })
})
