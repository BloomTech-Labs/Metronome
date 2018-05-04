import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { Link, Route } from 'react-router-dom';

import Assignments from '../Assignments/Assignments';
import Billing from '../Billing';
import UserSettings from '../UserSettings/UserSettings';

import AddAssignmentForm from '../Assignments/AddAssignment/AddAssignmentForm';
const Menu = ({ match }) => (
  <div>
  <Container>
      <Row>
        <Col md={3}>
    <ul>
      <li>
        <Link to={`${match.url}/assignments`}>assignments</Link>{' '}
      </li>
      <li>
        <Link to={`${match.url}/billing`}>billing</Link>{' '}
      </li>
      <li>
        <Link to={`${match.url}/settings`}>settings</Link>{' '}
      </li>
    </ul>
    </Col>
    <Col md={9}>
      <Route path={`${match.path}/assignments`}  
      render={(props) => (
    <Assignments {...props} match={match} />
    )}/>
    <Route path={`${match.path}/billing`} component={Billing} />
    <Route path={`${match.path}/setings`} component={UserSettings} />
    <Route path={`${match.urls}/add-assignment`} 
        render={(props) => (
    <AddAssignmentForm {...props} addAssignment={this.addAssignment} />
    )}/>
      
      </Col>
      </Row>
    </Container>
    </div>
)

export default Menu;
