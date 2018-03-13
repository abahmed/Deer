import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NoteListItem extends Component{
  render() {	
    return (
      <div className="card"> 
		{this.props.note}
		<button type="button">Delete</button>
      </div>
    );
  }	
}

NoteListItem.propTypes = {
  note: PropTypes.string.isRequired,
};

