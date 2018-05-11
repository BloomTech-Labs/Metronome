import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import {Grid, Checkbox, Button} from 'material-ui';
import 'react-datepicker/dist/react-datepicker.css';
import {addAssignment} from '../../../../../actions';

import './assignment-form.css';

class AssignmentForm extends Component {
  constructor (props) {
    super (props);

    this.state = {
      name: '',
      days: [],
      hours: '',
      Monday: false,
      Sunday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      dueDate: '',
      date: moment (),
      musicSheetAddr: '',
      email: '',
      fileName: null,
     
    };
  }

  onDrop = files => {
    const formData = new FormData ();
    formData.append ('file', files[0]);

    axios
      .post ('/api/teacher/getUploadUrl', formData, {
        headers: {
          Authorization: localStorage.getItem ('token'),
          'Content-Type': 'multipart/form-data',
        },
      })
      .then (response => {
        const {fileName, musicSheetAddr} = response.data;
        this.setState ({fileName, musicSheetAddr});
      })
      .catch (err => console.log (err));
  };

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
        days: [...this.state.days, name],
      });
    } else {
      const filteredArray = this.state.days.filter (
        day => day !== name
      );

      this.setState ({
        days: filteredArray,
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

  

  // Adds excitment via props/redux

  addAssignment = (event) => {
    // emails, name, days, dueDate, hours, musicSheetAddr;
    event.preventDefault();
    const {
      email,
      name,
      days,
      dueDate,
      hours,
      musicFile,
    } = this.state;
    const emails = email.split (',');
    const assignment = {
      emails,
      name,
      days,
      dueDate,
      hours,
      musicSheetAddr: musicFile,
    };
    this.props.addAssignment (assignment);
    this.setState ({
      name: '',
      days: [],
      hours: '',
      musicFile: '',
      file: '',
      email: '',
      date: moment(),
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
                name="name"
                value={this.state.name}
                onChange={this.handleStateDataChange}
              />
             
              <Grid container spacing={0} justify="center">
                <Grid item xs={16}>
                  <Checkbox
                    className="days"
                    checked={this.state.checkedSunday}
                    onChange={this.handleChange ('Sunday')}
                    value="checkedSunday"
                  />
                  <label htmlFor="checkedSunday">Sunday</label>
                  <Checkbox
                    className="days"
                    checked={this.state.checkedMonday}
                    onChange={this.handleChange ('Monday')}
                    value="checkedMonday"
                  />
                  <label htmlFor="checkedMonday">Monday</label>
                  <Checkbox
                    className="days"
                    checked={this.state.checkedTuesday}
                    onChange={this.handleChange ('Tuesday')}
                    value="checkedTuesday"
                  />
                  <label htmlFor="checkedTuesday">Tuesday</label>
                  <Checkbox
                    className="days"
                    checked={this.state.checkedWednesday}
                    onChange={this.handleChange ('Wednesday')}
                    value="checkedWednesday"
                  />
                  <label htmlFor="checkedWednesday">Wednesday</label>
                  <Checkbox
                    className="days"
                    checked={this.state.checkedThursday}
                    onChange={this.handleChange ('Thursday')}
                    value="checkedThursday"
                  />
                  <label htmlFor="checkedThursday">Thursday</label>
                  <Checkbox
                    className="days"
                    checked={this.state.checkedFriday}
                    onChange={this.handleChange ('Friday')}
                    value="checkedFriday"
                  />
                  <label htmlFor="checkedFriday">Friday</label>
                  <Checkbox
                    className="days"
                    checked={this.state.checkedSaturday}
                    onChange={this.handleChange ('Saturday')}
                    value="checkedSaturday"
                  />
                  <label htmlFor="checkedSaturday">Saturday</label>
                </Grid>
              </Grid>
              <Grid container justify="center">
              <div className='hours-container'>
                <Grid item />
                <input
                  className="hours"
                  name="hours"
                  type="text"
                  placeholder="0"
                  value={this.state.hours}
                  onChange={this.handleStateDataChange}
                />
                </div>
                <label htmlFor="hours">hrs</label>
                <label htmlFor="due date">Due Date:</label>
                <div className='date-container'>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.handledDateChange}
                />
                </div>
                <Grid item>
                  <Dropzone onDrop={this.onDrop} size={150}>
                    Drop some files here!
                  </Dropzone>
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
              <div className='button-container'>
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
              </div>
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
