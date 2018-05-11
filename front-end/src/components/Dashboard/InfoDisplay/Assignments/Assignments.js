import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAssignments, deleteAssignment } from '../../../../actions';

import AssignmentCard from './AssignmentCard/AssignmentCard';
import AddAssignmentCard from '../Assignments/AddAssignments/AddAssignmentCard';

import './assignments.css';

class Assignments extends Component {
  componentWillMount() {
    this.props.getAssignments();
  }

  deleteAssignment = (id) => {
    this.props.deleteAssignment(id);
  };

  render() {
    if (this.props.assignments.isPending) return <div>Loading...</div>;

    return (
      <div>
        <h1>Assignments</h1>

        <div className="card-container">
          {this.props.assignments.map((assignment, index) => (
            <div key={index}>
              <AssignmentCard
                id={index}
                deleteAssignment={this.deleteAssignment}
                name={assignment.assignmentName}
                dueDate={assignment.dueDate}
              />
            </div>

        {this.props.assignments.assignments.map((assignment, index) => (
          <div key={index}>
            <AssignmentCard
              id={index}
              deleteAssignment={this.deleteAssignment}
              name={assignment.assignmentName}
              dueDate={assignment.dueDate}
            />
          </div>

        ))}
          <AddAssignmentCard  />
        </div>
      </div>

    );
  }
}

Assignments.propTypes = {
  getAssignments: PropTypes.func.isRequired,
  assignments: PropTypes.arrayOf.isRequired,
  deleteAssignment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ assignments: state.assignments });

export default connect(mapStateToProps, { getAssignments, deleteAssignment })(Assignments);
