import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import LogoutLink from './LogoutLink';
import ComposeChowtLink from '../compose-chowt-link/ComposeChowtLink';

const AuthedButtons = ({ currentUser, renderIconsOnly }) => {
  const { profileImg, username } = currentUser;
  return (
    <>
      <li>
        <NavLink to="/notifications" exact className="nav-link">
          <i className="fas fa-bell" /> {!renderIconsOnly && 'Notifications'}
        </NavLink>
      </li>
      <li>
        <NavLink to="/messages" exact className="nav-link">
          <i className="fas fa-inbox" /> {!renderIconsOnly && 'Messages'}
        </NavLink>
      </li>
      <li>
        <NavLink to="/account/edit" exact className="nav-link">
          <i className="fas fa-user-cog" /> {!renderIconsOnly && 'Settings'}
        </NavLink>
      </li>
      <li>
        <NavLink to={`/users/account/${username}`} exact className="nav-link">
          <img src={profileImg} alt="user avatar" />{' '}
          {!renderIconsOnly && 'Profile'}
        </NavLink>
      </li>
      <li>
        <LogoutLink renderIconsOnly={renderIconsOnly} />
      </li>
      <li>
        <ComposeChowtLink />
      </li>
    </>
  );
};

AuthedButtons.propTypes = {
  currentUser: PropTypes.object,
  renderIconsOnly: PropTypes.bool.isRequired,
};

export default AuthedButtons;
