import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import AuthedButtons from './AuthedButtons';
import UnauthedButtons from './UnauthedButtons';

import './navbar.styles.scss';

const Navbar = ({ currentUser, renderIconsOnly }) => (
  <nav id="side-nav" className="mt-app">
    <div className="nav-header chowster-font">
      <NavLink to="/" exact className="nav-link">
        {renderIconsOnly ? <i className="fas fa-hamburger" /> : 'Chowster'}
      </NavLink>
    </div>
    <ul className="nav-items">
      <li>
        <NavLink to={currentUser.id ? '/home' : '/'} exact className="nav-link">
          <i className="fa fa-home fa-fw" /> {!renderIconsOnly && 'Home'}
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" exact className="nav-link">
          <i className="fas fa-info-circle" /> {!renderIconsOnly && 'About'}
        </NavLink>
      </li>
      {currentUser.id ? (
        <AuthedButtons
          currentUser={currentUser}
          renderIconsOnly={renderIconsOnly}
        />
      ) : (
        <UnauthedButtons renderIconsOnly={renderIconsOnly} />
      )}
    </ul>
  </nav>
);

Navbar.propTypes = {
  currentUser: PropTypes.object.isRequired,
  renderIconsOnly: PropTypes.bool.isRequired,
};

export default Navbar;
