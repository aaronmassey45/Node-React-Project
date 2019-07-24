import React, { useState, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import classNames from 'classnames';

import FOLLOW_USER from '../../mutations/FollowUser';

import './follow-button.styles.scss';

const FollowButton = ({ following, userId }) => {
  const [isFollowing, setFollowingState] = useState(following);
  const btnClasses = classNames('follow-button', 'btn', {
    'btn-success': isFollowing,
    'btn-primary': !isFollowing,
  });

  return (
    <Mutation
      mutation={FOLLOW_USER}
      variables={{ id: userId }}
      onCompleted={() => setFollowingState(true)}
      onError={err => console.log(err)}
    >
      {(followUser, { loading }) => {
        return (
          <button className={btnClasses} onClick={followUser}>
            {isFollowing ? (
              <Fragment>
                Following <i className="fas fa-check"></i>
              </Fragment>
            ) : (
              <Fragment>
                Follow <i className="fas fa-user-plus"></i>
              </Fragment>
            )}
          </button>
        );
      }}
    </Mutation>
  );
};

export default FollowButton;
