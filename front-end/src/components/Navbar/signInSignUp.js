import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions';

import './signin-signup.css';

class LoginNavBar extends Component {
  navbarLinks = () => {
    const token = window.localStorage.getItem('token');
    if (token) {
      return [
        <LinkContainer to="/dashboard">
          <NavItem href="#">Dashboard</NavItem>
        </LinkContainer>,
        <LinkContainer to="/" onClick={() => this.props.logout(this.props.history)}>
          <NavItem href="#">Sign Out</NavItem>
        </LinkContainer>,
      ];
    }
    return [

      <LinkContainer to="/signup" exact>
        <NavItem eventKey={1} href="#">Sign Up</NavItem>
      </LinkContainer>,
      <LinkContainer to="/login" exact>
        <NavItem eventKey={2} href="#">Log In</NavItem>
      </LinkContainer>,

    ];
  };
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <p>Metronome</p>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav >
          {this.navbarLinks()}
        </Nav>
      </Navbar>
    );
  }
}

export default connect(null, { logout })(LoginNavBar);
