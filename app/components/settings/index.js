import { connect } from 'react-redux'
import { compose } from 'redux'
import { withTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { saveSettings, setReadyStatus } from '../../actions/settings'
import Settings from './settings'

const mapStateToProps = state => ({
  settingsStatus: state.settingsReducer.get('settingsStatus')
})

const mapDispatchToProps = dispatch => ({
  saveSettings: newSettings => dispatch(saveSettings(newSettings)),
  setReadyStatus: () => dispatch(setReadyStatus())
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withTranslation(),
  withRouter
)(Settings)
