import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import LIKE_CHOWT from '../mutations/LikeChowt';
import CURRENT_USER_QUERY from '../queries/CurrentUser';
import FETCH_USER_QUERY from '../queries/FetchUser';

const LikePostButton = ({ liked, id, username, updateAlert, show }) => {
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
    onError: err => {
      updateAlert({ bg: 'danger', msg: err.graphQLErrors });
      show();
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
  liked: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  updateAlert: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
};

export default LikePostButton;
