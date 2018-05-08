import React, { Component } from 'react';
import { Row, Col, Container, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Form, Label, Input } from 'reactstrap';

class StudentAssignments extends Component {
  constructor() {
    super();
    this.state = {
      assignmentName: '',
      dueDate: '',
      image: '',
      description: '',
      timeStudying: '',
    };

    
  }

  render() {
    return (
      <div>
        <Row>
          <Col sm="6">
            <Card body>
              <CardBody>
                <CardTitle>Assignment Name</CardTitle>
                <CardSubtitle>Due Date</CardSubtitle>
              </CardBody>
              <img top width="100%" src="http://michaelmarc.com/content/images/thumbs/000/0000410_hallelujah-sheet-music-tabs_400.png" />
              <CardBody>
                <CardText>Description of Assignment</CardText>
              </CardBody>
              <Form>
                <Label for="number">Input Hours</Label>
                <Input type="number" name="hours" id="hours" placeholder="hours" />
              </Form>
            </Card>
          </Col>
          <Col sm="6">
            <Card body>
              <CardBody>
                <CardTitle>Assignment Name</CardTitle>
                <CardSubtitle>Due Date</CardSubtitle>
              </CardBody>
              <img top width="100%" src="http://michaelmarc.com/content/images/thumbs/000/0000410_hallelujah-sheet-music-tabs_400.png" />
              <CardBody>
                <CardText>Description of Assignment</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default StudentAssignments;