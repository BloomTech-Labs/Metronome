import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './landingpage.css';

const LoginNavBar = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <p>Metronome</p>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <LinkContainer to="/signup">
        <NavItem eventKey={1} href="#">Sign Up</NavItem>
      </LinkContainer>
      <LinkContainer to="/login">
        <NavItem eventKey={2} href="#">Log In</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
);


export default LoginNavBar;
