import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const UnauthedButtons = ({ renderIconsOnly }) => {
  return (
    <Fragment>
      <li>
        <NavLink to="/login" exact className="nav-link">
          <i className="fa fa-sign-in fa-fw" /> {!renderIconsOnly && 'Login'}
        </NavLink>
      </li>
      <li>
        <NavLink to="/signup" exact className="nav-link">
          <i className="fa fa-user-plus fa-fw" />{' '}
          {!renderIconsOnly && 'Sign Up'}
        </NavLink>
      </li>
    </Fragment>
  );
};

UnauthedButtons.propTypes = {
  renderIconsOnly: PropTypes.bool.isRequired,
};

export default UnauthedButtons;
