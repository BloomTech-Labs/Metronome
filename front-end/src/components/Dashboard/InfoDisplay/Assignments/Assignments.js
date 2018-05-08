import React, { Component } from 'react';
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
        <h3>{assignment.title}</h3>
        <p>{assignment.body}</p>
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

const mapStateToProps = state => ({ assignments: state.assignments });

export default connect(mapStateToProps, { getAssignments })(Assignments);
