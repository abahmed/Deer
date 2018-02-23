import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ACTIONS from './actions';
class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(ACTIONS.fetchAllNotes());
  }
  addNote() {

  }
  render() {
    return (
      <div>
        <input type='textarea' id='note'>
        </input>
        <button type='button' onClick={this.addNote()}> Add note</button>
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps({ notes }) {
  return { notes };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ACTIONS, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(
  App
);
