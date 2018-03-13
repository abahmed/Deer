import React, { Component } from 'react';

export default class NoteListItem extends Component{
	render() {	
		return (
			<div> 
				<li>
					{this.props.note}
				</li>
			</div>
		);
	}	
};