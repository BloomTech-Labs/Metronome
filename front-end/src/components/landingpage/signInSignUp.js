import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './landingpage.css';

const LoginNavBar = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <p>Metronome</p>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1} href="#">Sign Up</NavItem>
      <NavItem eventKey={2} href="#">Sign In</NavItem>
    </Nav>
  </Navbar>
);


export default LoginNavBar;
