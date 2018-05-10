import React from 'react';
import {connect} from 'react-redux';

const TeacherAssignments = props => {
  const {assignmentName} = props.match.params;
  const sortedList = props.assignments.filter (
    assignment => assignment.assignmentName === assignmentName
  );
  const clientNames = sortedList.map ((assign) => {
    return <li>{assign.clientName}</li>;
  });
  const daysPractice = sortedList.map((a => {
   return a.daysToPractice.map((day => {
      return <li>{day}</li>
    }))
  }))
  
  return (
    <div>
      <h1>{assignmentName}</h1>

      <ul>
        {clientNames}
        {daysPractice}
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({assignments: state.assignments});

export default connect (mapStateToProps, null) (TeacherAssignments);
