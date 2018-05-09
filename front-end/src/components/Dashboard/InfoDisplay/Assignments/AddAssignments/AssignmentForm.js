import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {Grid, Checkbox, Button} from 'material-ui';
import 'react-datepicker/dist/react-datepicker.css';
import {addAssignment} from '../../../../../actions';

class AssignmentForm extends Component {
  constructor (props) {
    super (props);

    this.state = {
      assignmentName: '',
      daysToPractice: [],
      hoursToPractice: '',
      Monday: false,
      Sunday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      dueDate: '',
      date: moment (),
      musicFile: '',
      email: '',
      file: null,
      clientName: '',
    };
  }

  // Changes state of items that are handled
  handleStateDataChange = event => {
    this.setState ({
      [event.target.name]: event.target.value,
    });
  };

  // Handles the unchecking and checking of days to practice
  // adds or takes away from array based on state of checked
  // this is what gets passed up to assignments
  handleChange = name => event => {
    this.setState ({
      [name]: event.target.checked,
    });
    if (event.target.checked) {
      this.setState ({
        daysToPractice: [...this.state.daysToPractice, name],
      });
    } else {
      const filteredArray = this.state.daysToPractice.filter (
        day => day !== name
      );

      this.setState ({
        daysToPractice: filteredArray,
      });
    }
  };

  //	handles date of the date picker

  handledDateChange = date => {
    const dueDate = date.format ('l');

    this.setState ({
      dueDate,
      date,
    });
  };

  // This is for handling filed upload
  // TODO: Need to make sure this works with server figure out how to send data
  handleFileUpload = event => {
    alert ('uploading file');
    this.setState ({
      musicFile: event.target.files[0].name,
    });
  };

  // Adds excitment via props/redux

  addAssignment = () => {
    this.props.addAssignment (this.state);
    this.setState ({
      assignmentName: '',
      daysToPractice: [],
      hoursToPractice: '',
      musicFile: '',
      file: '',
      email: '',
      Wednesday: false,
    });
  };

  render () {
    return (
      <div>
        <div style={{margin: 40}}>
          <Grid container spacing={0} align="center">
            <Grid item xs={12}>
              <input
                className="title"
                placeholder="Assignment Name"
                name="assignmentName"
                value={this.state.assignmentName}
                onChange={this.handleStateDataChange}
              />
              <Grid item xs={12}>
                <input
                  className="client"
                  placeholder="Client Name"
                  name="clientName"
                  value={this.state.clientName}
                  onChange={this.handleStateDataChange}
                />
              </Grid>
              <Grid container spacing={0} justify="center">
                <Grid item xs={16}>
                  <Checkbox
                    className="daysToPractice"
                    checked={this.state.checkedSunday}
                    onChange={this.handleChange ('Sunday')}
                    value="checkedSunday"
                  />
                  <label htmlFor="checkedSunday">Sunday</label>
                  <Checkbox
                    className="daysToPractice"
                    checked={this.state.checkedMonday}
                    onChange={this.handleChange ('Monday')}
                    value="checkedMonday"
                  />
                  <label htmlFor="checkedMonday">Monday</label>
                  <Checkbox
                    className="daysToPractice"
                    checked={this.state.checkedTuesday}
                    onChange={this.handleChange ('Tuesday')}
                    value="checkedTuesday"
                  />
                  <label htmlFor="checkedTuesday">Tuesday</label>
                  <Checkbox
                    className="daysToPractice"
                    checked={this.state.checkedWednesday}
                    onChange={this.handleChange ('Wednesday')}
                    value="checkedWednesday"
                  />
                  <label htmlFor="checkedWednesday">Wednesday</label>
                  <Checkbox
                    className="daysToPractice"
                    checked={this.state.checkedThursday}
                    onChange={this.handleChange ('Thursday')}
                    value="checkedThursday"
                  />
                  <label htmlFor="checkedThursday">Thursday</label>
                  <Checkbox
                    className="daysToPractice"
                    checked={this.state.checkedFriday}
                    onChange={this.handleChange ('Friday')}
                    value="checkedFriday"
                  />
                  <label htmlFor="checkedFriday">Friday</label>
                  <Checkbox
                    className="daysToPractice"
                    checked={this.state.checkedSaturday}
                    onChange={this.handleChange ('Saturday')}
                    value="checkedSaturday"
                  />
                  <label htmlFor="checkedSaturday">Saturday</label>
                </Grid>
              </Grid>
              <Grid container justify="center">
                <Grid item />
                <input
                  className="hours"
                  name="hoursToPractice"
                  type="text"
                  placeholder="0"
                  value={this.state.hoursToPractice}
                  onChange={this.handleStateDataChange}
                />
                <label htmlFor="hoursToPractice">hrs</label>
                <label htmlFor="due date">Due Date:</label>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.handledDateChange}
                />

                <Grid item>
                  <input type="file" onChange={this.handleFileUpload} />
                </Grid>
              </Grid>
              <Grid container justify="center">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleStateDataChange}
                />
              </Grid>
              <Grid item>
                <Button variant="raised" onClick={this.addAssignment}>
                  Submit
                </Button>

              </Grid>
              <Grid item>
                <Button variant="raised" onClick={this.props.history.goBack}>
                  Assignments
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

AssignmentForm.propTypes = {
  addAssignment: PropTypes.func.isRequired,
};

export default connect (null, {addAssignment}) (AssignmentForm);
