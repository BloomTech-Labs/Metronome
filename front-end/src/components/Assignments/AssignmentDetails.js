import React from 'react';

const AssignmentDetails = props => (
  <div>
    <ul>
      <li>{props.client}</li>
      <li>{props.dueDate}</li>
      <li>{props.music}</li>
    </ul>
  </div>
);

export default AssignmentDetails;
