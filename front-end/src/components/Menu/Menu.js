import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { Link, Route } from 'react-router-dom';

import Assignments from '../Dashboard/InfoDisplay/Assignments/Assignments';
import Billing from '../Dashboard/InfoDisplay/Billing/';
import UserSettings from '../Dashboard/InfoDisplay/UserSettings/UserSettings';


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
          <Route
            path={`${match.path}/assignments`}
            render={props => (
              <Assignments {...props} match={match} />
            )}
          />
          <Route path={`${match.path}/billing`} component={Billing} />
          <Route path={`${match.path}/settings`} component={UserSettings} />
        </Col>
      </Row>
    </Container>
  </div>
);

export default Menu;
