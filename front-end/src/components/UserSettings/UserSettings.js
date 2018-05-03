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

  render() {
    return (
      <div>
        <form>
          <h1>Update Email</h1>
          <div>
            <input
              updateEmail=""
              placeholder="New Email"
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
              oldPass=""
              placeholder="Old Password"
            />
            <br />
          </div>
          <div>
            <input
              newPass=""
              placeholder="NewPassword"
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
