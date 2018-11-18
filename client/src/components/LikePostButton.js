import React from 'react';
import { Mutation } from 'react-apollo';
import classNames from 'classnames';

import LIKE_CHOWT from '../mutations/LikeChowt';
import CURRENT_USER_QUERY from '../queries/CurrentUser';
import FETCH_USER_QUERY from '../queries/FetchUser';

const LikePostButton = ({ liked, id, username, updateAlert, show }) => {
  return (
    <Mutation
      mutation={LIKE_CHOWT}
      onError={err => {
        updateAlert({ bg: 'danger', msg: err.graphQLErrors });
        show();
      }}
    >
      {likeChowt => (
        <i
          className={classNames('fa fa-sm fake-link', {
            'fa-heart text-danger': liked,
            'fa-heart-o': !liked,
          })}
          onClick={() =>
            likeChowt({
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
            })
          }
        />
      )}
    </Mutation>
  );
};

export default LikePostButton;
