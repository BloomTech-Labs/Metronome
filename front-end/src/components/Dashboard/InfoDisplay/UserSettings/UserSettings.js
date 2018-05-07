import React, { Component } from 'react';
import axios from 'axios';
import './userSettings.css';

class UserSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      newEmail: '',
      oldPassword: '',
      newPassword: '',
    };
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const url = '/api/user';
    const jwt = window.localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWViNzI5ODU1NDZiMDhiZDQ2M2I2NGMiLCJlbWFpbCI6IjEyM0AxMjMuY29tIiwibmFtZSI6InRpbmcgd2FuZyIsImV4cCI6MTUyODA4NDM5NywiaWF0IjoxNTI1NDkyMzk2fQ.XGShPbeR4f4XFV7gWp91byRNXhyte3bvo6NrieTX24Y';

    // send updated information to backend
    const userInfo = this.state;
    axios.put(url, userInfo, {
      headers: {
        Authorization: jwt,
      },
    }).then((res) => {
      console.log('Update successful', res.data);
      window.localStorage.setItem('token', res.data.token);
    }).catch((error) => {
      console.log('Update Error', error.message);
    });

    this.setState({
      firstName: '',
      lastName: '',
      newEmail: '',
      oldPassword: '',
      newPassword: '',
    });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit} style={{ maxWidth: '50%' }}>
          <div className="row">
            <div className="col-25">
              <label htmlFor="firstName">First Name:</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="lastName">Last Name:</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="newEmail">Email:</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                name="newEmail"
                placeholder="New email"
                value={this.state.newEmail}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="oldPassword">Old Password:</label>
            </div>
            <div className="col-75">
              <input
                type="password"
                name="oldPassword"
                placeholder="Old Password"
                value={this.state.oldPassword}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="newPassword">New Password:</label>
            </div>
            <div className="col-75">
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={this.state.newPassword}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="row">
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserSettings;
