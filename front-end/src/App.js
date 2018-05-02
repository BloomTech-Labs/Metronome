import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import SignUp from './components/Signup/SignUp';
import LogIn from './components/LogIn/LogIn.js';
import Assignments from './components/Assignments/Assignments';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
      </div>
    );
  }
}

export default App;
