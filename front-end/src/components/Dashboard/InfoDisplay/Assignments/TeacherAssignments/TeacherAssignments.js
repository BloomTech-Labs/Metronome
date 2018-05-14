import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'material-ui';
import './teacher-assignments.css';
import { getAssignments } from '../../../../../actions';

class TeacherAssignments extends Component {
  componentWillMount() {
    this.props.getAssignments();
  }

  render() {
    const { assignmentId } = this.props.match.params;
    const sortedList = this.props.assignments.assignments.filter(assignment => assignment._id === assignmentId);
    return (
      <div>
        <h1>{sortedList[0].name}</h1>
        {sortedList.map(assign => (
          <div>
            <div>{assign.students.map(student => (
              <div>
                <h3>{`Student Name: ${student.firstName} ${student.lastName}`}</h3>
                <div style={{ display: 'flex' }}>{Object.keys(assign.days).map(day => (
                  <div>
                    <Checkbox
                      name={day}
                      checked={assign.days[day]}
                      value={assign.days[day]}
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

      ))
    }
      </div>
    );
  }
}

const mapStateToProps = state => ({ assignments: state.assignments });

export default connect(mapStateToProps, { getAssignments })(TeacherAssignments);
