import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import LIKE_CHOWT from 'graphql/mutations/LikeChowt';
import CURRENT_USER_QUERY from 'graphql/queries/CurrentUser';
import FETCH_USER_QUERY from 'graphql/queries/FetchUser';

const LikePostButton = ({ liked, id, username, setMessageAndShowSnackbar }) => {
  const [likeChowt] = useMutation(LIKE_CHOWT, {
    variables: { id },
    refetchQueries: [
      {
        query: CURRENT_USER_QUERY,
        variables: { withLikedPosts: true },
      },
      {
        query: FETCH_USER_QUERY,
        variables: { username },
      },
    ],
    onError: () => {
      setMessageAndShowSnackbar('Unable to like chowt, try again later.');
    },
  });

  return (
    <i
      className={classNames('fa fa-sm fake-link', {
        'fa-heart text-danger': liked,
        'fa-heart-o': !liked,
      })}
      onClick={likeChowt}
    />
  );
};

LikePostButton.propTypes = {
  id: PropTypes.string.isRequired,
  liked: PropTypes.bool.isRequired,
  setMessageAndShowSnackbar: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default LikePostButton;
