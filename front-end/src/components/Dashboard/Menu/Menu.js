import React from 'react';
import { NavLink } from 'react-router-dom';

import './Menu.css';

const Menu = ({ match }) => (
  <div>

    <ul className="menu">
      <li>
        <NavLink activeClassName="active" to={`${match.url}/assignments`}>
          assignments
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to={`${match.url}/billing`}>
          billing
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to={`${match.url}/settings`}>
          settings
        </NavLink>
      </li>
    </ul>
  </div>
);

export default Menu;
