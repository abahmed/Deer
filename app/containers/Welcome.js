import { connect } from 'react-redux'
import WelcomePage from '../components/Welcome'
import { updateLang, stopUpdateLang } from '../actions/welcome'
import { saveSettings } from '../actions/settings'

const mapStateToProps = state => ({
  index: state.welcomeReducer.index,
  fadeIn: state.welcomeReducer.fadeIn,
  langList: state.welcomeReducer.langList,
  settingsStatus: state.settingsReducer.settingsStatus
})

const mapDispatchToProps = dispatch => ({
  updateLang: () => dispatch(updateLang()),
  stopUpdateLang: () => dispatch(stopUpdateLang()),
  saveSettings: newSettings => dispatch(saveSettings(newSettings))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomePage)
