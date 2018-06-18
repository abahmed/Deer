import Home from './components/Home'
import Welcome from './containers/Welcome'

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/welcome',
    exact: true,
    component: Welcome
  }
]
export default routes
