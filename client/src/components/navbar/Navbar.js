import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ navButtons }) => (
  <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
    <NavLink to="/" exact className="nav-link p-0">
      <span className="navbar-brand mb-0 chowster-font text-dark">
        Chowster
      </span>
    </NavLink>

    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div
      className="navbar-collapse collapse justify-content-between"
      id="navbarNav"
    >
      <ul className="navbar-nav mb-0 p-0">
        <li
          className="nav-item"
          data-toggle="collapse"
          data-target=".navbar-collapse.show"
        >
          <NavLink to="/" exact className="nav-link">
            <i className="fa fa-home fa-fw" />
            Home
          </NavLink>
        </li>
        {navButtons}
      </ul>
    </div>
  </nav>
);

export default Navbar;
