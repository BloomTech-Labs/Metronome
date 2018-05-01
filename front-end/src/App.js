import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import SignUp from './components/Signup/SignUp';
import LogIn from './components/LogIn/LogIn';

class App extends Component {
	render() {
		return (
			<div>
				<Route path="/signup" component={SignUp} />
				<Route path="/login" component={LogIn} />
			</div>
		);
	}
  render() {
    return (
      <div className="App">
        <h1>App</h1>
      </div>
    );
  }
}

export default App;
