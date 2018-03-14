import React, { Component } from 'react';
import PropTypes from 'prop-types';

//This component renders all the notes added/saved by the user
export default class NoteList extends Component {
  componentDidMount() {
    this.props.fetchAllNotes();
  }

  render() {
    const notes = this.props.notes.map(note => {
      return (
        //TODO: Build a seperate component for the note item.
          <li key={note.id}>
             {note.doc.payload}
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
