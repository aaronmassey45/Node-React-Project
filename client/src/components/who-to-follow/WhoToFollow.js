import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

import './who-to-follow.styles.scss';

import GET_RANDOM_USERS from '../../graphql/queries/getRandomUsers';

const WhoToFollow = () => {
  const {
    data: { randomUsers },
    loading,
    refetch,
  } = useQuery(GET_RANDOM_USERS);

  return (
    <div id="who-to-follow">
      <div className="card">
        <div className="card-header">Who to Follow</div>
        {loading
          ? null
          : randomUsers.map(user => (
              <div key={user.username} className="list-item">
                <div className="img-container">
                  <img src={user.profileImg} alt={user.username} />
                </div>
                <div className="content-body">
                  <Link to={`/users/account/${user.username}`}>
                    @{user.username}
                  </Link>
                  <div>{user.bio}</div>
                </div>
              </div>
            ))}
        <div className="card-footer">
          <button className="btn btn-block btn-dark" onClick={() => refetch()}>
            Get more
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhoToFollow;
