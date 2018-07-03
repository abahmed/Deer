import { connect } from 'react-redux'
import WelcomePage from '../components/Welcome'
import {
  updateLang,
  stopUpdateLang
} from '../actions/welcome'

const mapStateToProps = state => ({
  index: state.welcomeReducer.index,
  fadeIn: state.welcomeReducer.fadeIn,
  langList: state.welcomeReducer.langList
})

const mapDispatchToProps = dispatch => ({
  updateLang: () => dispatch(updateLang()),
  stopUpdateLang: () => dispatch(stopUpdateLang())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomePage)
