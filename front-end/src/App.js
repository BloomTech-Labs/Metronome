import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import SignUp from './components/Signup/SignUp';
import LogIn from './components/LogIn/LogIn.js';
import Assignments from './components/Assignments/Assignments';
import EnsureLoggedInContainer from './components/EnsureLoggedIn/EnsureLoggedInContainer';
import Billing from './components/Billing';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/billing" component={Billing} />
      </div>
    );
  }
}

export default App;
