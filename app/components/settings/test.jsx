import React from 'react'
import { shallow } from 'enzyme'
import Settings from './settings'

import { unwrap } from '@material-ui/core/test-utils'

jest.mock('../../../__mocks__/electron')
jest.mock('../../utils/api.electron')

const USettings = unwrap(Settings)
const settingsObj = new USettings()

describe('<Settings />', () => {
  describe('render()', () => {
    test('renders the settings component', () => {
      const wrapper = shallow(<Settings />)
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('props', () => {
    test('language', () => {
      expect(settingsObj.state.language).toEqual('en')
    })
  })

  describe('methods', () => {
    test('_isSaveDisabled', () => {
      expect(settingsObj._isSaveDisabled()).toEqual(true)
    })
  })
})
