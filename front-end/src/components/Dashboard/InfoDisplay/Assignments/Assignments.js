import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAssignments } from '../../../../actions';

import AssignmentForm from '../Assignments/AddAssignments/AssignmentForm';

class Assignments extends Component {
  componentWillMount() {
    this.props.getAssignments();
  }

  render() {
    const assignmentItems = this.props.assignments.map(assignment => (
      <div key={assignment.id}>
        <h3>{assignment.assignmentName}</h3>
        <p>{assignment.dueDate}</p>
      </div>
    ));

    return (
      <div>
        <AssignmentForm />
        <hr />
        <h1>Assignments</h1>
        {assignmentItems}
      </div>
    );
  }
}

Assignments.propTypes = {
  getAssignments: PropTypes.func.isRequired,
  assignments: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = state => ({ assignments: state.assignments });

export default connect(mapStateToProps, { getAssignments })(Assignments);
