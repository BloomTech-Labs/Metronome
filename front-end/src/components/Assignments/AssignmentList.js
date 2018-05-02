import React from 'react';
import AssignmentDetails from './AssignmentDetails';

import { Button } from 'material-ui';

const AssignmentList = (props) => {
  const { assignments, addAssignment } = props;
  if (!assignments.length) {
    return (
      <div>
        <h1>Better get some clients</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>AssignmentList</h1>
      {assignments.map((assignment, key) => (
        <div key={key}>
          <AssignmentDetails
            music={assignment.music}
            dueDate={assignment.dueDate}
            client={assignment.client}
          />
        </div>
			))}
      
    </div>
  );
};

export default AssignmentList;
