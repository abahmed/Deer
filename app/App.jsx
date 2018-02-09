import React, {Component} from 'react'
import PropTypes from 'prop-types';

import ACTIONS from './actions';
class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(ACTIONS.fetchAllNotes());
  }
  render() {
    return (
      <div>
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default App;
