import { compose } from 'redux'
import { withNamespaces } from 'react-i18next'

import PopoverIcon from './component'

export default compose(
  withNamespaces()
)(PopoverIcon)
