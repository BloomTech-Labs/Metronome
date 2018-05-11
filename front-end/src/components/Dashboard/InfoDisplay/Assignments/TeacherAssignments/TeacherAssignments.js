import React, { Component } from 'react';
import { connect } from 'react-redux';
import './teacher-assignments.css';
import { getAssignments } from '../../../../../actions';

class TeacherAssignments extends Component {
  componentWillMount() {
    this.props.getAssignments();
  }

  render() {
    const { assignmentName } = this.props.match.params;
    const sortedList = this.props.assignments.assignments.filter(assignment => assignment.name === assignmentName);
    return (
      <div>
        <h1>{assignmentName}</h1>
        {sortedList.map(assign => (
          <div>
            <li>{assign.clientName}</li>
            <ul>{assign.days.map(day => (
              <li className="day">{day}</li>
        ))}
            </ul>
          </div>

      ))
    }
      </div>
    );
  }
}

const mapStateToProps = state => ({ assignments: state.assignments });

export default connect(mapStateToProps, { getAssignments })(TeacherAssignments);
