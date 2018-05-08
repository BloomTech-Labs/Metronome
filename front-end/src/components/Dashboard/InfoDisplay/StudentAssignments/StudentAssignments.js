import React, { Component } from 'react';
import { Row, Container, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

class StudentAssignments extends Component {
  constructor() {
    super();
    this.state = {
      assignments: [],
    };
  }

  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>Assignment Name</CardTitle>
            <CardSubtitle>Due Date</CardSubtitle>
          </CardBody>
          <img top width="100%" src="http://michaelmarc.com/content/images/thumbs/000/0000410_hallelujah-sheet-music-tabs_400.png" />
          <CardBody>
            <CardText>Description of Assignment</CardText>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default StudentAssignments;