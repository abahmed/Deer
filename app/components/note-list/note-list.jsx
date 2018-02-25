import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class NoteList extends Component {
  componentDidMount() {
    this.props.fetchAllNotes();
  }

  render() {

    const notes = this.props.notes.map(note => {
      return (
          <li>
             {note}
          </li>
      );
    });

    return (
      <div>
        <ul>
          {notes}
        </ul>
      </div>
    );
  }
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
  fetchAllNotes: PropTypes.func.isRequired,
};
