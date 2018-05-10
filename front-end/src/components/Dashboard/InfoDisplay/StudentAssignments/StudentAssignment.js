import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStudentAssignment } from '../../../../actions';
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { checkbox } from 'material-ui';
import './studentassignment.css';

class StudentAssignments extends Component {
  componentWillMount() {
    const { assignmentId } = this.props.match.params;
    this.props.getStudentAssignment(assignmentId);
  }

  render() {
    return (
      <div className="body">
        <Card>
          <CardBody>
            <CardTitle>{this.props.assignments[0].assignmentName}</CardTitle>
            <CardSubtitle>{this.props.assignments[0].dueDate}</CardSubtitle>
          </CardBody>

          <img
            top
            width="100%"
            src="http://michaelmarc.com/content/images/thumbs/000/0000410_hallelujah-sheet-music-tabs_400.png"
            alt="img"
          />
          <div className="days-container">
            <fieldset>
              <legend>Check off when you pratice</legend>
              {this.props.assignments[0].daysToPractice.map(day => (
                <div>
                  <div className="checkbox">
                  <input type="checkbox" id={day} value={day} />
                </div>
                  <label htmlFor={day}>{day}</label>
                </div>
            ))}
            </fieldset>
          </div>

          <div className="form">
            <h3>Practice {this.props.assignments[0].hoursToPractice} Hours</h3>
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({ assignments: state.assignments });

export default connect(mapStateToProps, { getStudentAssignment })(StudentAssignments);
