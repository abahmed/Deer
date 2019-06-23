import { connect } from 'react-redux'

import Welcome from './welcome'
import { saveSettings } from '../../actions/settings'

const mapStateToProps = state => ({
  settingsStatus: state.settingsReducer.get('settingsStatus')
})

const mapDispatchToProps = dispatch => ({
  saveSettings: newSettings => dispatch(saveSettings(newSettings))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome)
