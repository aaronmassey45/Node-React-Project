import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './navbar.styles.scss';

const Navbar = ({ navButtons, renderIconsOnly }) => (
  <nav id="side-nav" className="mt-app">
    <div className="nav-header chowster-font">
      <NavLink to="/" exact className="nav-link">
        {renderIconsOnly ? <i className="fas fa-hamburger" /> : 'Chowster'}
      </NavLink>
    </div>
    <ul className="nav-items">
      <li>
        <NavLink to="/" exact className="nav-link">
          <i className="fa fa-home fa-fw" /> {!renderIconsOnly && 'Home'}
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" exact className="nav-link">
          <i className="fas fa-info-circle" /> {!renderIconsOnly && 'About'}
        </NavLink>
      </li>
      {navButtons}
    </ul>
  </nav>
);

Navbar.propTypes = {
  navButtons: PropTypes.element,
  renderIconsOnly: PropTypes.bool.isRequired,
};

export default Navbar;
