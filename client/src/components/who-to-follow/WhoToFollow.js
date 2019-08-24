import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

import FollowButton from '../follow-button/FollowButton';
import Spinner from '../spinner/Spinner';
import CURRENT_USER from '../../graphql/queries/CurrentUser';
import GET_RANDOM_USERS from '../../graphql/queries/getRandomUsers';
import './who-to-follow.styles.scss';

const WhoToFollow = () => {
  const {
    data: { randomUsers },
    loading,
    refetch,
  } = useQuery(GET_RANDOM_USERS);
  const {
    data: { me },
  } = useQuery(CURRENT_USER);

  return (
    <div id="who-to-follow">
      <div className="card">
        <div className="card-header">Who to Follow</div>
        {loading ? (
          <Spinner />
        ) : (
          randomUsers.map(user => (
            <div key={user.username} className="list-item">
              <div className="img-container">
                <img src={user.profileImg} alt={user.username} />
              </div>
              <div className="content-body">
                <Link
                  to={`/users/account/${user.username}`}
                  className="username"
                >
                  @{user.username}
                </Link>
                <FollowButton
                  userId={user.id}
                  following={!!me.following.find(o => o.id === user.id)}
                />
              </div>
            </div>
          ))
        )}
        <div className="card-footer">
          <button className="btn btn-block btn-dark" onClick={() => refetch()}>
            Get More Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhoToFollow;
