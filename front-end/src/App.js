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
}

export default App;
