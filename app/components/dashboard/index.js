import { connect } from 'react-redux'
import { compose } from 'redux'
import { withNamespaces } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { addNewNote } from '../../actions/note'
import Dashboard from './dashboard'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  addNewNote: () => dispatch(addNewNote())
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNamespaces(),
  withRouter
)(Dashboard)
