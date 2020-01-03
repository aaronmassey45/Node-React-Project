import React, { useState, Fragment } from 'react';
import { useMutation } from '@apollo/react-hooks';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Snackbar from 'components/snackbar/Snackbar';
import FOLLOW_USER from 'graphql/mutations/FollowUser';
import UNFOLLOW_USER from 'graphql/mutations/UnfollowUser';
import GET_USERS_FEED from 'graphql/queries/getUsersFeed';
import UPDATE_AFTER_FOLLOW from 'graphql/queries/updateAfterFollow';
import useSnackbar from 'react-hooks/useSnackbar';

import './follow-button.styles.scss';

const FollowButton = ({ following, userId }) => {
  const [isFollowing, setFollowingState] = useState(following);
  const [isHovering, setHovering] = useState(false);

  const { isShown, message, setMessageAndShowSnackbar } = useSnackbar();

  const mutation = isFollowing ? UNFOLLOW_USER : FOLLOW_USER;
  const [followMutation] = useMutation(mutation, {
    variables: { id: userId },
    onCompleted: () => setFollowingState(!isFollowing),
    refetchQueries: [
      { query: UPDATE_AFTER_FOLLOW, variables: { id: userId } },
      { query: GET_USERS_FEED },
    ],
    onError: err => {
      setMessageAndShowSnackbar(err.graphQLErrors[0].message);
    },
  });

  const btnClasses = classNames('follow-button', {
    active: isFollowing,
  });

  return (
    <>
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
      <Snackbar message={message} isShown={isShown} />
    </>
  );
};

FollowButton.propTypes = {
  following: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
};

export default FollowButton;
