import React from 'react';
import Spinner from '../spinner/Spinner';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import FollowButton from '../follow-button/FollowButton';

import './tab-content.styles.scss';

const TabContent = ({ loading = false, users, currentUser }) => {
  if (loading) return <Spinner />;

  return (
    <div className="tab-content">
      {users.map(user => (
        <div key={user.username} className="list-item">
          <div className="img-container">
            <img src={user.profileImg} alt={user.username} />
          </div>
          <div className="content-body">
            <div className="flex">
              <Link to={`/users/account/${user.username}`}>
                @{user.username}
              </Link>
              {currentUser !== user.id && (
                <FollowButton
                  userId={user.id}
                  following={!!user.followers.find(o => o.id === currentUser)}
                />
              )}
            </div>
            <div>{user.bio}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

TabContent.propTypes = {
  loading: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  currentUser: PropTypes.string.isRequired,
};

export default TabContent;
