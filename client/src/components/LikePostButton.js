import React from 'react';
import { Mutation } from 'react-apollo';
import classNames from 'classnames';

import LIKE_CHOWT from '../mutations/LikeChowt';

const LikePostButton = ({ liked, id, CurrentUser, FetchUser, username }) => {
  return (
    <Mutation mutation={LIKE_CHOWT}>
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
                  query: CurrentUser,
                  variables: { withLikedPosts: true },
                },
                {
                  query: FetchUser,
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
