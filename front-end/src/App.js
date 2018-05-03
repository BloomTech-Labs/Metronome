import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import SignUp from './components/Signup/SignUp';
import LogIn from './components/LogIn/LogIn.js';
import LandingPage from './components/LandingPage/landingpage';
import TeacherDashboard from './Containers/TeacherDashboard';
import Billing from './components/Billing';
import UserSettings from './components/UserSettings/UserSettings';


class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={LandingPage} />
	      <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/teacher" component={TeacherDashboard} />
        <Route path="/billing" component={Billing} />
        <Route path="/settings" component={UserSettings} />
      </div>
    );
  }
}

export default App;
