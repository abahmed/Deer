import { compose } from 'redux'
import { withTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import About from './about'

export default compose(
  withTranslation(),
  withRouter
)(About)
