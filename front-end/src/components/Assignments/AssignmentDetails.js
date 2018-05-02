import React from 'react';

const AssignmentDetails = props => (
  <div>
    <ul>
      <li>Title: {props.name}</li>
      <li>{props.days}</li>
      <li>{props.hours}</li>
      <li>{props.dueDate}</li>
      <li>{props.file}</li>
      <li>{props.email}</li>
      <li>{props.client}</li>
    </ul>
  </div>
);

export default AssignmentDetails;
