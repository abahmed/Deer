/** entry for the app */
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { ipcRenderer } from 'electron'
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom'
import { create } from 'jss'
import rtl from 'jss-rtl'
import JssProvider from 'react-jss/lib/JssProvider'
import {
  createMuiTheme,
  MuiThemeProvider,
  createGenerateClassName,
  jssPreset
} from '@material-ui/core/styles'

import routes from './utils/routes'
import configureStore from './utils/store'
import i18n from './i18n'
import { theme } from './assets/theme'

import './assets/styles/index.css'

/** Configure JSS */
const jss = create({ plugins: [...jssPreset().plugins, rtl()] })

/** Custom Material-UI class name generator. */
const generateClassName = createGenerateClassName()

/** Configure redux store */
const store = configureStore()

/** Renders Apps with proper direction */
function renderApp () {
  const app = document.getElementById('app')

  // Set localization direction.
  const dir = i18n.dir()
  app.setAttribute('dir', dir)
  theme.direction = dir

  render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <JssProvider jss={jss} generateClassName={generateClassName}>
          <MuiThemeProvider theme={createMuiTheme(theme)}>
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
        </JssProvider>
      </Provider>
    </I18nextProvider>,
    app
  )
}

renderApp()

/** Re-render app to update localization direction. */
i18n.on('languageChanged', function (lng) {
  renderApp()
})

/** Do checks before closing app to avoid losing data */
ipcRenderer.on('close-main-window', (e) => {
  // TODO: Add checks before closing app (e.g. save current work).
  ipcRenderer.send('close-confirm')
})
