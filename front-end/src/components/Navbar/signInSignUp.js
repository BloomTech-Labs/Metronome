import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';
import {logout} from '../../actions';

import './navbar.css';

class LoginNavBar extends Component {
  navbarLinks = () => {
    const token = window.localStorage.getItem ('token');
    if (token) {
      return [
        <LinkContainer to="/dashboard/assignments">
          <NavItem href="#">Assignment</NavItem>
        </LinkContainer>,
        <LinkContainer to="/dashboard/billing">
          <NavItem href="#">Billing</NavItem>
        </LinkContainer>,
        <LinkContainer to="/dashboard/settings">
          <NavItem href="#">Settings</NavItem>
        </LinkContainer>,
        <LinkContainer
          to="/"
          onClick={() => this.props.logout (this.props.history)}
        >
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
  render () {
    return (
      <div className="container">
        <Navbar inverse fixedTop>
              avbar.Header>
            <Navbar.Brand>
            
              <NavItem className="nav-brand" href="/">Metronome</NavItem>

            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            {this.navbarLinks ()}
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default connect (null, {logout}) (LoginNavBar);
