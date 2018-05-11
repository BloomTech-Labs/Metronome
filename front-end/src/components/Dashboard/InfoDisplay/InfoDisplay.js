import React from 'react';
import PropTypes from 'prop-types';

import { Route, Switch } from 'react-router-dom';

import Assignments from '../InfoDisplay/Assignments/Assignments';
import AssignmentDetails from '../InfoDisplay/Assignments/AssignmentDetails/AssignmentDetails';
import Billing from '../InfoDisplay/Billing/index';
import UserSettings from '../InfoDisplay/UserSettings/UserSettings';
import AssignmentForm from '../InfoDisplay/Assignments/AddAssignments/AssignmentForm';
import StudentAssignment from '../InfoDisplay/StudentAssignments/StudentAssignment';
import TeacherAssignments from './Assignments/TeacherAssignments/TeacherAssignments';


const InfoDisplay = props => (
  <div>
    <Switch>
      <Route
        path={`${props.match.path}/assignments`}

        component={Assignments}
        match={props.match}
      />
      <Route path={`${props.match.path}/billing`} component={Billing} />
      <Route path={`${props.match.path}/settings`} component={UserSettings} />
      <Route
        path={`${props.match.path}/add-assignment`}
        component={AssignmentForm}
      />
      <Route
        path={`${props.match.path}/teacher-assignment-details/:userId`}
        component={AssignmentDetails}
      />
      <Route
        path={`${props.match.path}/student-assignment-details/:assignmentId`}
        component={StudentAssignment}
      />
      <Route
        path={`${props.match.path}/teacher-assignments/:assignmentName`}
        component={TeacherAssignments}
      />
    </Switch>
  </div>
);

InfoDisplay.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default InfoDisplay;
