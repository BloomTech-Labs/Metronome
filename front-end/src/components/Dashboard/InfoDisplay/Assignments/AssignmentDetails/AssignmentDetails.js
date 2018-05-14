import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button } from 'material-ui';

const AssignmentDetails = (props) => {
  const id = props.match.params.userId;
  const assignDetails = props.assignments.assignments.filter(assignment => assignment._id === id)[0];
  if (!assignDetails) return <div>Loading...</div>;
  const date = moment(assignDetails.dueDate).format('l');
  const studentEmails = assignDetails.students.map(student => student.email).join(', ');
  const studentNames = assignDetails.students.map(student => `${student.firstName} ${student.lastName}`).join(', ');
  return (
    <div>
      <h1>Assignment Details</h1>
      <h3> Assignment name: {assignDetails.name}</h3>
      <h3>Practice days: {Object.keys(assignDetails.days).join(' | ')}</h3>
      <h3>Due date: {date}</h3>
      <h3>Students: {studentNames}</h3>
      <h3>Assigned emails: {studentEmails}</h3>
      <h3>Practice hours: {assignDetails.hours} hrs/day</h3>
      <h3>Download: <a href={assignDetails.musicSheetAddr}>{assignDetails.fileName}</a> </h3>
      <Link to="/dashboard/assignments">
        <Button variant="raised">
        Assignments
        </Button>
      </Link>
    </div>
  );
};

AssignmentDetails.propTypes = {
  assignments: PropTypes.arrayOf.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({ assignments: state.assignments });

export default connect(mapStateToProps, null)(AssignmentDetails);
