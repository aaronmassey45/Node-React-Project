import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import FollowButton from '../../components/follow-button/FollowButton';
import Stars from '../../components/stars/Stars';

import './user-details.styles.scss';

const UserDetails = ({ user, currentUser, canFollow }) => (
  <div id="user-details" className="card-body">
    <div className="header">
      <img src={user.profileImg} alt="user" className="profile-img" />
      <div className="user-actions">
        {canFollow && (
          <FollowButton
            following={!!user.followers.find(o => o.id === currentUser.id)}
            userId={user.id}
          />
        )}
      </div>
    </div>
    <div className="user-content">
      <div className="content-bold user-name">{user.username}</div>
      <div className="text-white">{user.bio}</div>
      <div>
        <i className="fas fa-map-marked-alt" /> {user.location}
      </div>
      <div className="followers-container">
        <Link to={`/${user.username}/following`}>
          <span className="content-bold">{user.following.length}</span>{' '}
          Following
        </Link>
        <Link to={`/${user.username}/followers`}>
          <span className="content-bold">{user.followers.length}</span>{' '}
          Followers
        </Link>
      </div>
      {user.isAFoodTruck && (
        <Stars
          average={parseFloat(user.rating.average)}
          id={user.id}
          interactive={user.isAFoodTruck && !!currentUser}
        />
      )}
    </div>
  </div>
);

UserDetails.propTypes = {
  user: PropTypes.object,
  currentUser: PropTypes.object,
  canFollow: PropTypes.bool,
};

export default UserDetails;
