import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from '../app/App'

Enzyme.configure({adapter: new Adapter()})

test('App has empty body', () => {
  const app = shallow(<App/>)
  const Store = require('electron-store');
  expect(app.text()).toEqual('')
})
