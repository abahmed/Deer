import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardFooter,
  CardTitle,
  CardBody,
  CardHeader,
} from 'reactstrap';

export default class NoteListItem extends Component{
  render() {
    return (
          <Card> 
            <CardBody>
              <p> {this.props.note} </p>
            </CardBody>
            <CardFooter>
              <button>Delete</button>
            </CardFooter>
          </Card>
    );
  }
}

NoteListItem.propTypes = {
  note: PropTypes.string.isRequired,
};
