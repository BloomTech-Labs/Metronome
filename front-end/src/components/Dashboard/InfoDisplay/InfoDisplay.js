import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Assignments from '../InfoDisplay/Assignments/Assignments';
import Billing from '../InfoDisplay/Billing/index';
import UserSettings from '../InfoDisplay/UserSettings/UserSettings';
import AddAssignmentForm from '../InfoDisplay/Assignments/AddAssignment/AddAssignmentForm';

const InfoDisplay = props => (
	<div>
		<Switch>
			<Route
				path={`${props.match.path}/assignments`}
				render={props => <Assignments {...props} match={props.match} />}
			/>

			<Route path={`${props.match.path}/billing`} component={Billing} />
			<Route path={`${props.match.path}/settings`} component={UserSettings} />
			<Route
				path={`${props.match.path}/add-assignment`}
				component={AddAssignmentForm}
			/>
		</Switch>
	</div>
);

export default InfoDisplay;
