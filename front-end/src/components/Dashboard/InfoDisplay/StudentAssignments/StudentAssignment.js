import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { getStudentAssignment } from '../../../../actions';


import './studentassignment.css';

class StudentAssignments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }
  componentWillMount() {
    const { assignmentId } = this.props.match.params;
    this.props.getStudentAssignment(assignmentId);
  }

  // TODO: Need to setup to change checkbox to completed for that day
  // Send data to action and get data back
  toggleCheck = () => {
    this.setState({
      checked: !this.state.checked,
    });
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
              <legend>Check off when you practice</legend>
              {this.props.assignments[0].daysToPractice.map(day => (
                <div className="day-check-container">

                  <div className="box">
                    <label htmlFor={day}>{day}</label>
                    <input
                      className="check-box"
                      type="checkbox"
                      id={day}
                      value={day}
                      onClick={this.toggleCheck}
                    />
                  </div>

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

StudentAssignments.propTypes = {
  getStudentAssignment: PropTypes.func.isRequired,
  assignments: PropTypes.arrayOf.isRequired,
  match: PropTypes.shape({
    params: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({ assignments: state.assignments });

export default connect(mapStateToProps, { getStudentAssignment })(StudentAssignments);
