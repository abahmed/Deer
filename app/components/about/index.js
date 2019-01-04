import { compose } from 'redux'
import { withNamespaces } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import About from './component'

export default compose(
  withNamespaces(),
  withRouter
)(About)
