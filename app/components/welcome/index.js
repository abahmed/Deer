import { connect } from 'react-redux'

import Welcome from './component'
import { saveSettings } from '../../actions/settings'

const mapStateToProps = state => ({
  settingsStatus: state.settingsReducer.settingsStatus
})

const mapDispatchToProps = dispatch => ({
  saveSettings: newSettings => dispatch(saveSettings(newSettings))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome)
