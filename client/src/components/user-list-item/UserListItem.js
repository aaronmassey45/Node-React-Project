import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import FollowButton from '../follow-button/FollowButton';
import './user-list-item.styles.scss';

const UserListItem = ({ user, currentUserId }) => (
  <div key={user.username} className="list-item user">
    <div className="img-container">
      <img src={user.profileImg} alt={user.username} />
    </div>
    <div className="content-body">
      <div className="flex">
        <Link
          to={`/users/account/${user.username}`}
          className="list-item-username"
        >
          <b>@{user.username}</b>
        </Link>
        {!!currentUserId && currentUserId !== user.id && (
          <FollowButton
            userId={user.id}
            following={!!user.followers.find(o => o.id === currentUserId)}
          />
        )}
      </div>
      <div>{user.bio}</div>
    </div>
  </div>
);

UserListItem.propTypes = {
  currentUserId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default UserListItem;
