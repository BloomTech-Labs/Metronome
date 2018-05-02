import React from 'react';
import AssignmentDetails from './AssignmentDetails';

const AssignmentList = ({ assignments }) => (
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

export default AssignmentList;
