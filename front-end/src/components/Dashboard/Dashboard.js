import React from 'react';
import PropTypes from 'prop-types';
import { Container, Col } from 'reactstrap';
import InfoDisplay from '../Dashboard/InfoDisplay/InfoDisplay';


const Dashboard = props => (
  <div>
    <Container>
      {/* <Col md={3}>
        <Menu match={props.match} />
      </Col> */}
      <Col md={9}>
        <InfoDisplay match={props.match} />
      </Col>
    </Container>
  </div>
);

Dashboard.propTypes = {
  match: PropTypes.string.isRequired,
};

export default Dashboard;
