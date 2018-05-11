import React from 'react';
import PropTypes from 'prop-types';

import InfoDisplay from '../Dashboard/InfoDisplay/InfoDisplay';

import './dashboard.css';

const Dashboard = props => (
  <div className="dashboard-container">
    <div>
      <InfoDisplay match={props.match} />
    </div>

  </div>
);

Dashboard.propTypes = {
  match: PropTypes.string.isRequired,
};

export default Dashboard;
