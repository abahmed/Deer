import React from 'react'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import routes from '../routes'

export default () => (
  <div>
    <BrowserRouter>
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
    </BrowserRouter>
  </div>
)
