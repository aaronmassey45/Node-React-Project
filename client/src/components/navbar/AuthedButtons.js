import React from 'react';
import { NavLink } from 'react-router-dom';

export default ({ logout, username }) => {
  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle fake-link"
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {username}
      </a>
      <div
        className="dropdown-menu bg-dark dropdown-menu-right"
        aria-labelledby="navbarDropdown"
      >
        <div
          className="dropdown-item"
          data-toggle="collapse"
          data-target=".navbar-collapse.show"
        >
          <NavLink to={`/users/account/${username}`} exact className="nav-link">
            <i className="fa fa-user fa-fw" />
            Profile
          </NavLink>
        </div>
        <div
          className="dropdown-item"
          data-toggle="collapse"
          data-target=".navbar-collapse.show"
        >
          <NavLink to="/users/account/edit" exact className="nav-link">
            <i className="fa fa-pencil fa-fw" />
            Account
          </NavLink>
        </div>
        <div className="dropdown-divider" />
        <div
          className="dropdown-item"
          data-toggle="collapse"
          data-target=".navbar-collapse.show"
        >
          <span className="nav-link fake-link" onClick={logout}>
            <i className="fa fa-sign-out fa-fw" />
            Logout
          </span>
        </div>
      </div>
    </li>
  );
};
