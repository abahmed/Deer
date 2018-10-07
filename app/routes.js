import Home from './components/Home'
import Welcome from './containers/Welcome'
import Settings from './containers/Settings'

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
  },
  {
    path: '/settings',
    exact: true,
    component: Settings
  }
]
export default routes
