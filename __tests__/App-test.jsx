import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from '../app/App'

Enzyme.configure({adapter: new Adapter()})

test('App contains Deer header', () => {
  const app = shallow(<App/>)
  console.log(app.text())
  expect(app.text()).toContain('Deer')
})
