import React from 'react';
import { connect } from 'react-redux';
import { getStudentList } from '../../../../../actions';

const TeacherAssignments = (props) => {
  const { assignmentName } = props.match.params;
  props.getStudentList(assignmentName);
  return (
    <div>
      <h1>{assignmentName}</h1>
      {console.log(props.assignments)}
    </div>
  );
};

const mapStateToProps = state => ({assignments: state.assignments });

export default connect(mapStateToProps, { getStudentList }) (TeacherAssignments);
