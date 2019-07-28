import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Mutation } from 'react-apollo';
import classNames from 'classnames';

import FOLLOW_USER from '../../mutations/FollowUser';
import UNFOLLOW_USER from '../../mutations/UnfollowUser';

import './follow-button.styles.scss';

const FollowButton = ({ following, userId }) => {
  const [isFollowing, setFollowingState] = useState(following);
  const [isHovering, setHovering] = useState(false);

  const btnClasses = classNames('follow-button', {
    active: isFollowing,
  });

  return (
    <Mutation
      mutation={isFollowing ? UNFOLLOW_USER : FOLLOW_USER}
      variables={{ id: userId }}
      onCompleted={() => setFollowingState(!isFollowing)}
      onError={err => console.log(err)}
    >
      {followFunc => (
        <button
          className={btnClasses}
          onClick={followFunc}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {isFollowing ? (
            <Fragment>
              {isHovering ? (
                <Fragment>
                  Unfollow <i className="fas fa-user-minus" />
                </Fragment>
              ) : (
                <Fragment>
                  Following <i className="fas fa-check" />
                </Fragment>
              )}
            </Fragment>
          ) : (
            <Fragment>
              Follow <i className="fas fa-user-plus"></i>
            </Fragment>
          )}
        </button>
      )}
    </Mutation>
  );
};

FollowButton.propTypes = {
  following: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
};

export default FollowButton;
