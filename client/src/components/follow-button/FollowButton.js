import React, { useState, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import classNames from 'classnames';

import FOLLOW_USER from '../../mutations/FollowUser';
import UNFOLLOW_USER from '../../mutations/UnfollowUser';

import './follow-button.styles.scss';

const FollowButton = ({ following, userId }) => {
  const [isFollowing, setFollowingState] = useState(following);
  const btnClasses = classNames('follow-button', 'btn', {
    'btn-success': isFollowing,
    'btn-primary': !isFollowing,
  });

  return (
    <Mutation
      mutation={isFollowing ? UNFOLLOW_USER : FOLLOW_USER}
      variables={{ id: userId }}
      onCompleted={() => setFollowingState(!isFollowing)}
      onError={err => console.log(err)}
    >
      {(followFunc, { loading }) => {
        return (
          <button className={btnClasses} onClick={followFunc}>
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
