import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const UnauthedButtons = () => (
  <Fragment>
    <li>
      <NavLink to="/login" exact className="nav-link">
        <i className="fa fa-sign-in fa-fw" />{' '}
        <span className="show-on-xl">Login</span>
      </NavLink>
    </li>
    <li>
      <NavLink to="/signup" exact className="nav-link">
        <i className="fa fa-user-plus fa-fw" />{' '}
        <span className="show-on-xl">Sign Up</span>
      </NavLink>
    </li>
  </Fragment>
);

export default UnauthedButtons;
