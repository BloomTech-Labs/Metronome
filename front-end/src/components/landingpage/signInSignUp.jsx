import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';

class LoginButtons extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <ButtonToolbar>
          <Button>Sign Up</Button>
          <Button>Sign In</Button>
        </ButtonToolbar>
    </div>
    );
  }
}


export default LoginButtons;
