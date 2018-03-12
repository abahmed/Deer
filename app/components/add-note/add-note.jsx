import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ACTIONS from './../../actions';

class AddNote extends Component {
  constructor (props) {
    super(props);
    this.state = {
      note: '',
    }
    this.saveNote = this.saveNote.bind(this);
    this.changeEvent = this.changeEvent.bind(this);
  }

  // This method is called onChange of the text field,
  // so that we update the local state on every change
  changeEvent(event) {
    this.setState({ note: event.target.value });
  }

  saveNote() {
    const { addNote } = this.props;
    addNote({ payload: this.state.note});
  }

  render() {
    return (
      <div >
        <input
          type="textarea"
          name="message"
          id="text"
          placeholder="Add your note here."
          onChange={this.changeEvent}
        />
        <button onClick={this.saveNote}>Add note</button>
      </div>
    );
  }
}

AddNote.propTypes = {
  addNote: PropTypes.func.isRequired,
};

// This method maps the actions to dispatch, 
// which provide the actions as a part of props
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ACTIONS, dispatch);
}

// This method maps the state to dispatch, 
// which provide the state as a part of props
function mapStatetoProps(state) {
  return state;
}
export default connect(mapStatetoProps, mapDispatchToProps)(AddNote);
