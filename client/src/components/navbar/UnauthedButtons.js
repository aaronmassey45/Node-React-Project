import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

export default () => {
  return (
    <Fragment>
      <li
        className="nav-item"
        data-toggle="collapse"
        data-target=".navbar-collapse.show"
      >
        <NavLink to="/login" exact className="nav-link">
          <i className="fa fa-sign-in fa-fw" />
          Login
        </NavLink>
      </li>
      <li
        className="nav-item"
        data-toggle="collapse"
        data-target=".navbar-collapse.show"
      >
        <NavLink to="/signup" exact className="nav-link">
          <i className="fa fa-user-plus fa-fw" />
          Sign Up
        </NavLink>
      </li>
    </Fragment>
  );
};
