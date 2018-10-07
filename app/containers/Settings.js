import { connect } from 'react-redux'
import { compose } from 'redux'
import { withNamespaces } from 'react-i18next'
import Settings from '../components/Settings'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNamespaces()
)(Settings)
