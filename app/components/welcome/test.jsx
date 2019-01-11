import React from 'react'
import { shallow } from 'enzyme'
import Welcome from './welcome'

import { unwrap } from '@material-ui/core/test-utils'

jest.mock('../../../__mocks__/electron')
jest.mock('../../utils/api.electron')

const UWelcome = unwrap(Welcome)
const welcomeObj = new UWelcome()

describe('<Welcome />', () => {
  describe('render()', () => {
    test('renders the welcome component', () => {
      const wrapper = shallow(<Welcome />)
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('props', () => {
    test('state', () => {
      expect(welcomeObj.state.fadeIn).toEqual(true)
    })
    test('langIndex', () => {
      expect(welcomeObj.langIndex).toEqual(0)
    })
    test('timer', () => {
      expect(welcomeObj.timer).toEqual(0)
    })
  })

  describe('methods', () => {
    test('updateNextLangIndex', () => {
      welcomeObj.updateNextLangIndex()
      expect(welcomeObj.langIndex).toEqual(1)
    })
    test('updateLang with toggleFade', () => {
      welcomeObj.state.fadeIn = false
      welcomeObj.updateLang()
      expect(welcomeObj.langIndex).toEqual(2)
    })
  })
})
