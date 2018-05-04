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
    const url = '/api/user/edit';
    const jwt = window.localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZWI3Mjk4NTU0NmIwOGJkNDYzYjY0YyIsImVtYWlsIjoiMTIzQDEyMy5jb20iLCJuYW1lIjoidGluZyB3YW5nIiwiZXhwIjoxNTI3OTcxNzM3LCJpYXQiOjE1MjUzNzk3Mzd9.pc5jdU6FYaxiNMnfkW85H2ppAeoo1lcdAt9gcOuOMAQ';

    // send updated information to backend
    const userInfo = this.state;
    axios.post(url, { userInfo }, {
      headers: {
        Authorization: jwt,
      },
    }).then((res) => {
      console.log('Update successful', res.data);
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
                type="text"
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
                type="text"
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
