import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { viewAssignmentDetails } from '../../../../../actions';
import { Button } from 'material-ui';

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
        <Button variant="raised" onClick={this.props.history.goBack}>
								Assignments
        </Button>
      </div>
    );
  }
}

AssignmentDetails.propTypes = {
  viewAssignmentDetails: PropTypes.func.isRequired,
  assignments: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({ assignments: state.assignments });

export default connect(mapStateToProps, { viewAssignmentDetails })(AssignmentDetails);
