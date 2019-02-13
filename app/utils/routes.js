import Home from '../components/home'
import Welcome from '../components/welcome'
import About from '../components/about'
import Settings from '../components/settings'

/**
 * Declare routes for components.
 */
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
  },
  {
    path: '/about',
    exact: true,
    component: About
  }
]
export default routes
