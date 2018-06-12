import Home from './components/Home'
import Welcome from './components/Welcome'

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
