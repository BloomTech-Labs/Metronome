import React from 'react';
import { connect } from 'react-redux';

import './teacher-assignments.css';

const TeacherAssignments = (props) => {
  const { assignmentName } = props.match.params;
  const sortedList = props.assignments.filter(assignment => assignment.assignmentName === assignmentName);

  return (
    <div>
      <h1>{assignmentName}</h1>
      {sortedList.map(assign => (
        <div>
          <li>{assign.clientName}</li>
          <ul>{assign.daysToPractice.map(day => (
            <li className="day">{day}</li>
      ))}
          </ul>
        </div>

    ))
  }
    </div>
  );
};


const mapStateToProps = state => ({ assignments: state.assignments });

export default connect(mapStateToProps, null)(TeacherAssignments);
