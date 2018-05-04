import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignUp from '../components/Signup/SignUp';
import LogIn from '../components/LogIn/LogIn.js';
import LandingPage from '../components/landingpage/landingpage';
import TeacherDashboard from '../components/TeacherDashboard/TeacherDashboard';
import AddAssignmentForm from '../components/Assignments/AddAssignment/AddAssignmentForm';
import MoreAssignmentDetails from '../components/Assignments/MoreAssignmentDetails';

export default () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={LandingPage} />
			<Route path="/login" component={LogIn} />
			<Route path="/signup" component={SignUp} />
			<Route path="/teacher/add-assignment" component={AddAssignmentForm} />
			<Route path="/teacher" component={TeacherDashboard} />
			<Route
				path="/teacher/assignment-details/:id"
				component={MoreAssignmentDetails}
			/>
		</Switch>
	</BrowserRouter>
);
