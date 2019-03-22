import { compose } from 'redux'
import { withTranslation } from 'react-i18next'

import PopoverIcon from './popoverIcon'

export default compose(
  withTranslation()
)(PopoverIcon)
