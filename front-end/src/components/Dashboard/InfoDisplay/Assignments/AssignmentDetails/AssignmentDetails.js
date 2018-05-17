import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';

const AssignmentDetails = (props) => {
  const id = props.match.params.userId;
  const assignDetails = props.assignments.assignments.filter(assignment => assignment._id === id)[0];
  if (!assignDetails) return <div>Loading...</div>;
  const date = moment(assignDetails.dueDate).format('l');
  const studentEmails = assignDetails.students.map(student => student.email).join(', ') || assignDetails.emails.join(', ');
  const studentNames = assignDetails.students.map(student => `${student.firstName} ${student.lastName}`).join(', ') || <span style={{ color: 'red' }}>Unclaim</span>;
  return (
    <div className="card" style={{ width: '100%' }}>
      <div className="card-body">
        <h1>Assignment Details</h1>
        <ul className="list-group">
          <li className="list-group-item"><h3> Assignment name: {assignDetails.name}</h3></li>
          <li className="list-group-item"><h3>Practice days: {Object.keys(assignDetails.days).join(' | ')}</h3></li>
          <li className="list-group-item"><h3>Due date: {date}</h3></li>
          <li className="list-group-item"><h3>Students: {studentNames}</h3></li>
          <li className="list-group-item"><h3>Assigned emails: {studentEmails}</h3></li>
          <li className="list-group-item"><h3>Practice hours: {assignDetails.hours} hrs/day</h3></li>
          <li className="list-group-item">
            <h3>Music file:&nbsp;
              <button className="btn">
                <i className="fa fa-download" />
                <a href={assignDetails.musicSheetAddr}>
                  {assignDetails.fileName}
                </a>
              </button>
            </h3>
          </li>
        </ul>
        <button
          onClick={() => props.history.push('/dashboard/assignments')}
        >
          All Assignments
        </button>
      </div>
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
