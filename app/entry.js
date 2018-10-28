import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import { I18nextProvider } from 'react-i18next'
import { ipcRenderer } from 'electron'
import App from './components/App'
import i18n from './../utils/i18n'

import 'bootstrap/dist/css/bootstrap.min.css'
import './../assets/styles/index.css'

const store = configureStore()

render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <App />
    </Provider>
  </I18nextProvider>,
  document.getElementById('app')
)

ipcRenderer.on('close-main-window', (e) => {
  // TODO: Add checks before closing app (e.g. save current work).
  ipcRenderer.send('close-confirm')
})
