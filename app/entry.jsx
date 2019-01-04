import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { ipcRenderer } from 'electron'
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom'
import routes from './utils/routes'
import { MuiThemeProvider } from '@material-ui/core/styles'
import configureStore from './utils/store'
import i18n from './i18n/i18n'
import { theme } from './assets/theme'

import './assets/styles/index.css'

const store = configureStore()

function renderApp() {
  const app = document.getElementById('app')

  // Set localization direction.
  app.setAttribute('dir', i18n.dir())

  render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
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
        </MuiThemeProvider>
      </Provider>
    </I18nextProvider>,
    app
  )
}

renderApp()

// Re-render app to update localization direction.
i18n.on('languageChanged', function(lng) {
  renderApp()
})

ipcRenderer.on('close-main-window', (e) => {
  // TODO: Add checks before closing app (e.g. save current work).
  ipcRenderer.send('close-confirm')
})
