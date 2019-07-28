import { connect } from 'react-redux'
import { compose } from 'redux'
import { withTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { createNote } from '../../actions/note'
import Dashboard from './dashboard'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  createNote: () => dispatch(createNote())
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withTranslation(),
  withRouter
)(Dashboard)
