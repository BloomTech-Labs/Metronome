import React, { Component } from 'react';
import SideMenu from '../SideMenu/SideMenu';
import { Button } from 'material-ui';

class UserSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newEmail: '',
      oldPassword: '',
      newPassword: '',
    };
  }

  onChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  };

  onSubmit = event => {
    event.preventDefault();

    this.setState({
      newEmail: '',
      newPassword: '',
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <h1>Update Email</h1>
          <div>
            <input
              name="newEmail"
              placeholder="New Email"
              value={this.state.newEmail}
              onChange={this.onChange}
            />
            <br />
            <Button
            variant="raised"
            color="primary"
            type="submit"
            >
              Submit New Email
            </Button>
          </div>
          <div>
            <h1>Change Password</h1>
            <input
              name="oldPassword"
              placeholder="Old Password"
              value={this.state.oldPassword}
              onChange={this.onChange}
            />
            <br />
          </div>
          <div>
            <input
              name="newPassword"
              placeholder="NewPassword"
              value={this.state.newPassword}
              onChange={this.onChange}
            />
            <br />
          </div>
          <Button
            variant="raised"
            color="primary"
            type="submit"
          >
            Change Password
          </Button>
        </form>
      </div>
    )
  }
}

export default UserSettings;
