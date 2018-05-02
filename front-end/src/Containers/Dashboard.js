import React from 'react';

import { AppBar, Toolbar, Typography } from 'material-ui';

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
