import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'material-ui';
import './teacher-assignments.css';
import { getAssignmentById } from '../../../../../actions';

class TeacherAssignments extends Component {
  componentDidMount() {
    this.props.getAssignmentById(this.props.match.params.assignmentId);
  }

  render() {
    if (!this.props.assignment.assignment) { return <div>Loading...</div>; }
    return (
      <div>
        <h1>{this.props.assignment.assignment.name}</h1>
        <div>{this.props.assignment.assignment.students.map(student => (
          <div>
            <h3>{`Student Name: ${student.firstName} ${student.lastName}`}</h3>
            <div style={{ display: 'flex' }}>{Object.keys(this.props.assignment.assignment.days).map(day => (
              <div>
                <Checkbox
                  name={day}
                  checked={student.progress[day]}
                  disabled
                />
                <label htmlFor={day}>{day}</label>
              </div>
                  ))}
            </div>
          </div>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ assignment: state.assignment });

export default connect(mapStateToProps, { getAssignmentById })(TeacherAssignments);
