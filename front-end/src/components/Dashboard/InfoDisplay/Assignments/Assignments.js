import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { getAssignments, deleteAssignment, claimAssignment } from '../../../../actions';

import AssignmentCard from './AssignmentCard/AssignmentCard';
import AddAssignmentCard from '../Assignments/AddAssignments/AddAssignmentCard';

class Assignments extends Component {
  componentWillMount() {
    const assignmentToken = window.localStorage.getItem('assignmentToken');
    if (assignmentToken) {
      this.props.claimAssignment(assignmentToken);
    }
  }

  componentDidMount() {
    this.props.getAssignments();
  }

  deleteAssignment = (id) => {
    this.props.deleteAssignment(id);
  };

  render() {
    const { role } = jwtDecode(window.localStorage.getItem('token'));
    if (this.props.assignments.isPending || !this.props.assignments.assignments) return <div>Loading...</div>;
    return (
      <div>
        <h1>Assignments</h1>
        {this.props.assignments.assignments.length > 0 ? this.props.assignments.assignments.map(assignment => (
          <div key={assignment._id}>
            <AssignmentCard
              id={assignment._id}
              deleteAssignment={this.deleteAssignment}
              name={assignment.name}
              dueDate={assignment.dueDate}
            />
          </div>
        )) : role === 'Student' && <h3>There are no assignments</h3>}
        { role === 'Teacher' && <AddAssignmentCard />}
      </div>
    );
  }
}

Assignments.propTypes = {
  getAssignments: PropTypes.func.isRequired,
  assignments: PropTypes.arrayOf.isRequired,
  deleteAssignment: PropTypes.func.isRequired,
  claimAssignment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ assignments: state.assignments });

export default connect(mapStateToProps, { getAssignments, deleteAssignment, claimAssignment })(Assignments);
