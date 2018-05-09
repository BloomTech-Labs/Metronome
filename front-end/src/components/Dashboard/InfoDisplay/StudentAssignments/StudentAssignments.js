import React, { Component } from 'react';
import { Card, CardText, CardBody,
  CardTitle, CardSubtitle, Form, Label, Input } from 'reactstrap';
import './studentassignment.css';

class StudentAssignments extends Component {
  constructor() {
    super();
    this.state = {
      // assignmentName: '',
      // dueDate: '',
      // image: '',
      // description: '',
      // timeStudying: '',
    };
  }

  render() {
    return (
      <div className="body">
        <Card>
          <CardBody>
            <CardTitle>Assignment Name</CardTitle>
            <CardSubtitle>Due Date</CardSubtitle>
          </CardBody>

          <img
            top
            width="100%"
            alt="assignment-sheet-music"
            src="http://michaelmarc.com/content/images/thumbs/000/0000410_hallelujah-sheet-music-tabs_400.png"
          />

          <img top width="100%" src="http://michaelmarc.com/content/images/thumbs/000/0000410_hallelujah-sheet-music-tabs_400.png" alt="img" />

          <CardBody>
            <CardText>Description of Assignment</CardText>
          </CardBody>
          <div className="dateContainer">
            <input type="checkbox" className="checkbox"/>
            <label>Day of the Week</label>
          </div>
          <div className="form">
            <h3>Hours</h3>
          </div>
        </Card>
      </div>
    );
  }
}

export default StudentAssignments;
