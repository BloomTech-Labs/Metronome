import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SideMenu from '../components/SideMenu/SideMenu';
import AssignmentList from '../components/Assignments/AssignmentList';

import { AppBar, Toolbar, Typography, Grid } from 'material-ui';

class TeacherDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignments: ['test'],
    };
  }
  render() {
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
							Teacher Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container xs={12}>
          <Grid item sm={3}>
            <SideMenu />
          </Grid>
          <Grid item >
            <AssignmentList />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default TeacherDashboard;
