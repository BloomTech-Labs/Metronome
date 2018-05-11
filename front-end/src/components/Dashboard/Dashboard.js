import React from 'react';
import PropTypes from 'prop-types';

import InfoDisplay from '../Dashboard/InfoDisplay/InfoDisplay';
import Menu from '../Dashboard/Menu/Menu';

import './dashboard.css';

const Dashboard = props => (
  <div className="menu-container">
    <aside>
      <Menu match={props.match} />
    </aside>
    <div>
      <InfoDisplay match={props.match} />
    </div>

  </div>
);

Dashboard.propTypes = {
  match: PropTypes.string.isRequired,
};

export default Dashboard;
