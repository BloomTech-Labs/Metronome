import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import SignUp from './components/Signup/SignUp';

class App extends Component {
	render() {
		return (
			<div>
				<Route path="/signup" component={SignUp} />
			</div>
		);
	}
}

export default App;
