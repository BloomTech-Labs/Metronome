import React from 'react';
import {connect} from 'react-redux';

import './teacher-assignments.css';

const TeacherAssignments = props => {
  const {assignmentName} = props.match.params;
  const sortedList = props.assignments.filter (
    assignment => assignment.assignmentName === assignmentName
  ); console.log(sortedList);

  return (
  sortedList.map ((assign) => (
    <div>
      <h1>{assignmentName}</h1>
    <li>{assign.clientName}</li>  
      <ul>{assign.daysToPractice.map((day) => (
        <li className='day'>{day}</li>
      )
        
      )}</ul>
      </div>
    
  ))
)
}
  // const daysPractice = sortedList.map((a) => {
  //  return a.daysToPractice.map((day) => {
  //     return <li>{day}</li>
  //   });
  // });
  
  // return (
  //   <div>
  //     <h1>{assignmentName}</h1>

  //     {/* // <ul>
  //     //   {clientNames}
  //     //   {daysPractice}
  //     // </ul> */}
  //   </div>
  // );


const mapStateToProps = state => ({assignments: state.assignments});

export default connect(mapStateToProps, null)(TeacherAssignments);
