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
            <div>{assign.students.map(student => (
              <div>
                <h3>{`${student.firstName} ${student.lastName}`}</h3>
                <ul>{Object.keys(assign.days).map(day => (
                  <div className="day" style={{ display: 'inline-block' }}>
                    <input type="checkbox" name={day} value={assign.days[day]} checked={assign.days[day]} disabled="disabled" />
                    <label htmlFor={day}>{day}</label>
                  </div>
        ))}
                </ul>
              </div>
            ))}
            </div>
          </div>

      ))
    }
      </div>
    );
  }
}

const mapStateToProps = state => ({ assignments: state.assignments });

export default connect(mapStateToProps, { getAssignments })(TeacherAssignments);
