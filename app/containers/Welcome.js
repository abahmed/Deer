import { connect } from 'react-redux'
import WelcomePage from '../components/Welcome'
import {
  updateLang
} from '../actions/welcome'

const mapStateToProps = state => ({
  index: state.welcomeReducer.index,
  fadeIn: state.welcomeReducer.fadeIn,
  langList: state.welcomeReducer.langList
})

const mapDispatchToProps = dispatch => ({
  updateLang: () => dispatch(updateLang())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomePage)
