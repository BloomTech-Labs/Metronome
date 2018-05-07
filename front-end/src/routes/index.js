import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignUp from '../components/Signup/SignUp';
import LogIn from '../components/LogIn/LogIn.js';
import LandingPage from '../components/landingpage/landingpage';
import Dashboard from '../components/Dashboard/Dashboard';

export default () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={LandingPage} />
			<Route path="/login" component={LogIn} />
			<Route path="/signup" component={SignUp} />
			<Route path="/dashboard" component={Dashboard} />
		</Switch>
	</BrowserRouter>
);

