import { connect } from 'react-redux'
import WelcomePage from '../components/Welcome'
import {
  setWelcomeLang,
  updateLang
} from '../actions/welcome'

const mapStateToProps = state => ({
  lang: state.welcomeReducer.nextLang,
  fadeIn: state.welcomeReducer.fadeIn,
  langList: state.welcomeReducer.languages
})

const mapDispatchToProps = dispatch => ({
  setWelcomeLang: languages => dispatch(setWelcomeLang(languages)),
  updateLang: () => dispatch(updateLang())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomePage)
