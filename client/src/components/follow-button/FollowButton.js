import React, { useState, Fragment } from 'react';
import { useMutation } from '@apollo/react-hooks';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import FOLLOW_USER from '../../graphql/mutations/FollowUser';
import UNFOLLOW_USER from '../../graphql/mutations/UnfollowUser';
import UPDATE_AFTER_FOLLOW from '../../graphql/queries/updateAfterFollow';
import GET_USERS_FEED from '../../graphql/queries/getUsersFeed';

import './follow-button.styles.scss';

const FollowButton = ({ following, userId }) => {
  const [isFollowing, setFollowingState] = useState(following);
  const [isHovering, setHovering] = useState(false);

  const mutation = isFollowing ? UNFOLLOW_USER : FOLLOW_USER;
  const [followMutation] = useMutation(mutation, {
    variables: { id: userId },
    onCompleted: () => setFollowingState(!isFollowing),
    refetchQueries: [
      { query: UPDATE_AFTER_FOLLOW, variables: { id: userId } },
      { query: GET_USERS_FEED },
    ],
  });

  const btnClasses = classNames('follow-button', {
    active: isFollowing,
  });

  return (
    <button
      className={btnClasses}
      onClick={followMutation}
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
  );
};

FollowButton.propTypes = {
  following: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
};

export default FollowButton;
