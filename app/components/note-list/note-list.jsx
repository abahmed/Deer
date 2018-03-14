import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NoteListItem from '../note-list-item/note-list-item';

//This component renders all the notes added/saved by the user
//TODO: Build a seperate component for the note item.
export default class NoteList extends Component {
  componentDidMount() {
    this.props.fetchAllNotes();
  }

  render() {
    const notes = this.props.notes.map(note => {
      return (
        < NoteListItem
        note = { note.payload }
        />
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