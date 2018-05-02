import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import SideMenu from '../components/SideMenu/SideMenu';
import AssignmentList from '../components/Assignments/AssignmentList';
import Dashboard from './Dashboard';

import { AppBar, Toolbar, Typography, Grid } from 'material-ui';

class TeacherDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignments: [
        {
          music: 'music details',
          dueDate: '05/05/18',
          client: 'John Doe',
        },
        {
          music: 'music details2',
          dueDate: '05/07/18',
          client: 'Alyson Cramer',
        },
      ],
    };
  }
  render() {
    return (
      <div>
        <Dashboard title="Teacher" />
        <Grid container xs={12}>
          <Grid item sm={3}>
            <SideMenu />
          </Grid>

          <Grid item>
            <AssignmentList assignments={this.state.assignments} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default TeacherDashboard;
