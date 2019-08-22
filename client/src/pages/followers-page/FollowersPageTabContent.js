import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import FollowButton from '../../components/follow-button/FollowButton';
import Spinner from '../../components/spinner/Spinner';
import TabContent from '../../components/tab-content/TabContent';

const FollowersPageTabContent = ({ loading = false, users, currentUser }) => {
  if (loading) return <Spinner />;

  return (
    <TabContent>
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
    </TabContent>
  );
};

FollowersPageTabContent.propTypes = {
  loading: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  currentUser: PropTypes.string.isRequired,
};

export default FollowersPageTabContent;
