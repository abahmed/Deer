import React from 'react'
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom'
import routes from '../routes'

export default () => (
  <HashRouter>
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
      <Redirect to='/' />
    </Switch>
  </HashRouter>
)
