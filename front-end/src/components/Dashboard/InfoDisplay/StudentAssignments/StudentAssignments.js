import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardText,
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
      <div>
        <Row>
          <Col sm="6">
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
                <CardBody>
                  <CardText>Description of Assignment</CardText>
                </CardBody>
                <Form className="form">
                  <Label for="number">Input Hours:</Label>
                  <Input className="input" type="number" name="hours" id="hours" placeholder="hours" />
                </Form>
              </Card>
            </div>
          </Col>
          <Col sm="6">
            <Card className="body">
              <CardBody>
                <CardTitle>Assignment Name</CardTitle>
                <CardSubtitle>Due Date</CardSubtitle>
              </CardBody>
              <img
                top
                width="100%"
                alt="hallelujah"
                src="http://michaelmarc.com/content/images/thumbs/000/0000410_hallelujah-sheet-music-tabs_400.png"
              />
              <CardBody>
                <CardText>Description of Assignment</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default StudentAssignments;
