import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAssignments } from '../../../../actions';

import AssignmentCard from './AssignmentCard/AssignmentCard';
import AddAssignmentCard from '../Assignments/AddAssignments/AddAssignmentCard';

class Assignments extends Component {
  componentWillMount() {
    this.props.getAssignments();
  }

  deleteAssignment = (id) => {
    alert(id);
  }

  render() {
    return (
      <div>
        <h1>Assignments</h1>
        {this.props.assignments.map((assignment,index) => (
          <div key={index}>
            <AssignmentCard
              id={assignment.id}
              deleteAssignment={this.deleteAssignment}
              name={assignment.assignmentName}
              file={assignment.musicFile}
            />
          </div>
				))}
        <AssignmentCard />
        <AddAssignmentCard />
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
