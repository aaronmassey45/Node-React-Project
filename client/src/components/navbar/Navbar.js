import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import AuthedButtons from './AuthedButtons';
import UnauthedButtons from './UnauthedButtons';

import './navbar.styles.scss';

const Navbar = ({ currentUser }) => (
  <nav id="side-nav">
    <div className="nav-header chowster-font">
      <NavLink to="/" exact className="nav-link">
        <span className="hide-on-lg">
          <i className="fas fa-hamburger" />
        </span>
        <span className="hide-on-md">Chowster</span>
      </NavLink>
    </div>
    <ul className="nav-items">
      <li>
        <NavLink to={currentUser.id ? '/home' : '/'} exact className="nav-link">
          <i className="fa fa-home fa-fw" />{' '}
          <span className="hide-on-md">Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" exact className="nav-link">
          <i className="fas fa-info-circle" />{' '}
          <span className="hide-on-md">About</span>
        </NavLink>
      </li>
      {currentUser.id ? (
        <AuthedButtons currentUser={currentUser} />
      ) : (
        <UnauthedButtons />
      )}
    </ul>
  </nav>
);

Navbar.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default Navbar;
