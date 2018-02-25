import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ACTIONS from './../../actions';

class AddNote extends Component {
  constructor (props) {
    super(props);
    this.state = {
      note: '',
    }
    this.saveNote = this.saveNote.bind(this);
    this.changeEvent = this.changeEvent.bind(this);
  }

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
          placeholder="Placeholder"
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ACTIONS, dispatch);
}

function mapStatetoProps(state) {
  return state;
}
export default connect(mapStatetoProps, mapDispatchToProps)(AddNote);
