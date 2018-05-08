import React, { Component } from 'react';
import { Row, Container, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

class StudentAssignments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
    };
  }

  redner() {
    return (
      <div>
        <Container>
          <Row>
            <div className="assignemtName">
              <Card>
                <CardBody>
                  <CardTitle>Assignment Name</CardTitle>
                  <CardSubtitle>Due Date</CardSubtitle>
                </CardBody>
                <img top width="100%" src="http://www.musicnotes.com/sheetmusic/mtdVPE.asp?ppn=MN0096911&" />
                <CardBody>
                  <CardText>Description of Assignment</CardText>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </div>
    )
  }
}

export default StudentAssignments;