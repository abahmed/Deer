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
          <Card body outline color="success"> 
            <CardHeader tag="h3">Header</CardHeader>
            <CardBody>
              <CardTitle>Card title</CardTitle>
              <p> {this.props.note} </p>
            </CardBody>
            <CardFooter>
              <button color="secondary">Delete</button>
            </CardFooter>
          </Card>
    );
  }
}

NoteListItem.propTypes = {
  note: PropTypes.string.isRequired,
};
