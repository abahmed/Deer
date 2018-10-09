import { connect } from 'react-redux'
import { compose } from 'redux'
import { withNamespaces } from 'react-i18next'
import Settings from '../components/Settings'
import { saveSettings, setReadyStatus } from '../actions/settings'

const mapStateToProps = state => ({
  settingsStatus: state.settingsReducer.settingsStatus
})

const mapDispatchToProps = dispatch => ({
  saveSettings: (newSettings) => dispatch(saveSettings(newSettings)),
  setReadyStatus: () => dispatch(setReadyStatus())
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNamespaces()
)(Settings)
