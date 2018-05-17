import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox, Button } from 'material-ui';
import { Link } from 'react-router-dom';
import './teacher-assignments.css';
import { getAssignmentById } from '../../../../../actions';

class TeacherAssignments extends Component {
  componentDidMount() {
    this.props.getAssignmentById(this.props.match.params.assignmentId);
  }

  render() {
    if (!this.props.assignment.assignment) { return <div>Loading...</div>; }
    console.log(this.props.assignment);
    return (
      <div>
        <h1>{this.props.assignment.assignment.name}</h1>
        {this.props.assignment.assignment.students.length !== 0 ?
          <ul className="list-group">{this.props.assignment.assignment.students.map(student => (
            <li className="list-group-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Student:&nbsp;</h3>
              <h4>{`${student.firstName} ${student.lastName}`}</h4>
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
            </li>
              ))}
          </ul>
          : <ul className="list-group">{this.props.assignment.assignment.emails.map(email => <li className="list-group-item">{email} <span style={{ color: 'red' }}>Unclaimed</span></li>)}</ul>
        }
        <Link to="/dashboard/assignments">
          <Button variant="raised">
            Assignments
          </Button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({ assignment: state.assignment });

export default connect(mapStateToProps, { getAssignmentById })(TeacherAssignments);
