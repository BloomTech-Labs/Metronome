import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { getAssignments } from '../../../../actions';
import CheckboxForm from './CheckboxForm';


import './studentassignment.css';

class StudentAssignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }
  componentWillMount() {
    this.props.getAssignments();
  }

  // TODO: Need to setup to change checkbox to completed for that day
  // Send data to action and get data back
  toggleCheck = () => {
    this.setState({
      checked: !this.state.checked,
    });
  }

  render() {
    if (this.props.assignments.isPending || !this.props.assignments.assignments.length) { return <div>Loading...</div>; }
    const { assignmentId } = this.props.match.params;
    const filterAssignment = this.props.assignments.assignments.filter(assignment => assignment._id === assignmentId);
    const date = moment(filterAssignment[0].dueDate).format('l');
    const { days } = filterAssignment[0];
    return (
      <div className="body">
        <Card>
          <CardBody>
            <CardTitle>{filterAssignment[0].name}</CardTitle>
            <CardSubtitle>{date}</CardSubtitle>
          </CardBody>

          <img
            top
            width="100%"
            src="http://michaelmarc.com/content/images/thumbs/000/0000410_hallelujah-sheet-music-tabs_400.png"
            alt="img"
          />
          <div className="days-container">
            {/* <fieldset>
              <legend>Check off when you practice</legend>
              {filterAssignment[0].days.map(day => (
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
            </fieldset> */}
            <CheckboxForm days={days} assignmentId={assignmentId} />
          </div>

          <div className="form">
            <h3>Practice {filterAssignment[0].hours} Hours</h3>
          </div>
        </Card>
      </div>
    );
  }
}

StudentAssignment.propTypes = {
  getStudentAssignment: PropTypes.func.isRequired,
  assignments: PropTypes.arrayOf.isRequired,
  match: PropTypes.shape({
    params: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({ assignments: state.assignments });

export default connect(mapStateToProps, { getAssignments })(StudentAssignment);
