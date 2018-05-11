import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import './Menu.css';

const Menu = ({ match }) => (
  <div>
    <Container>
      <Row>
        <Col md={3}>
          <ul className="menu">
            <li>
              <NavLink activeClassName="active" to={`${match.url}/assignments`}>
							  assignments
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to={`${match.url}/billing`}>
								billing
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to={`${match.url}/settings`}>
								settings
              </NavLink>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Menu;
