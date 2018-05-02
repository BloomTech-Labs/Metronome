import React, { Component } from 'react';
import SideMenu from '../components/SideMenu/SideMenu';
import AssignmentList from '../components/Assignments/AssignmentList';

import { AppBar, Toolbar, Typography, Grid } from 'material-ui';

const TeacherDashboard = ({ title }) => (
  <div>
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="title" color="inherit">
          {title} Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
);

export default TeacherDashboard;
