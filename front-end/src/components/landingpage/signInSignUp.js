import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import './landingpage.css';

class LoginButtons extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <ButtonToolbar className="loginbutton">
          <Button>Sign Up</Button>
          <Button>Sign In</Button>
        </ButtonToolbar>
    </div>
    );
  }
}


export default LoginButtons;
