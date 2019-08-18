import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import LogoutLink from './LogoutLink';
import ComposeChowtLink from '../compose-chowt-link/ComposeChowtLink';

const AuthedButtons = ({ currentUser: { profileImg, username } }) => {
  return (
    <>
      <li>
        <NavLink to="/notifications" exact className="nav-link">
          <i className="fas fa-bell" />{' '}
          <span className="show-on-xl">Notifications</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/messages" exact className="nav-link">
          <i className="fas fa-inbox" />{' '}
          <span className="show-on-xl">Messages</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/account/edit" exact className="nav-link">
          <i className="fas fa-user-cog" />{' '}
          <span className="show-on-xl">Settings</span>
        </NavLink>
      </li>
      <li>
        <NavLink to={`/users/account/${username}`} exact className="nav-link">
          <img src={profileImg} alt="user avatar" />{' '}
          <span className="show-on-xl">Profile</span>
        </NavLink>
      </li>
      <li>
        <LogoutLink />
      </li>
      <li>
        <ComposeChowtLink />
      </li>
    </>
  );
};

AuthedButtons.propTypes = {
  currentUser: PropTypes.object,
};

export default AuthedButtons;
