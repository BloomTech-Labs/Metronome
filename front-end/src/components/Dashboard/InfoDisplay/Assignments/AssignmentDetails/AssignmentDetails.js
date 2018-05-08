import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { viewAssignmentDetails } from '../../../../../actions';

class AssignmentDetails extends Component {
  componentWillMount() {
    this.props.viewAssignmentDetails(this.props.match.params.userId);
  }

  render() {
    return (
      <div>
        <h1>Assignment Details</h1>
        <h3>{this.props.assignments.assignmentName}</h3>
        <h3>{this.props.assignments.daysToPractice}</h3>
        <h3>{this.props.assignments.clientName}</h3>
        <h3>{this.props.assignments.dueDate}</h3>
        <h3>{this.props.assignments.email}</h3>
        <h3>{this.props.assignments.file}</h3>
        <h3>{this.props.assignments.hoursToPractice}</h3>
        <h3>{this.props.assignments.musicFile}</h3>
      </div>
    );
  }
}

AssignmentDetails.propTypes = {
  viewAssignmentDetails: PropTypes.func.isRequired,
  assignments: PropTypes.string.isRequired,
  match: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({ assignments: state.assignments });

export default connect(mapStateToProps, { viewAssignmentDetails })(AssignmentDetails);
