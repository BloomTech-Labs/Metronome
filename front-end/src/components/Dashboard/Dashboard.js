import React, { Component } from 'react';
import { Container, Col } from 'reactstrap';
import InfoDisplay from '../Dashboard/InfoDisplay/InfoDisplay';
import Menu from '../Dashboard/Menu/Menu';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {},
    };
  }
  render() {
    return (
      <div>
        <Container>
          <Col md={3}>
            <Menu match={this.props.match} />
          </Col>
          <Col md={9}>
            <InfoDisplay match={this.props.match} />
          </Col>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
