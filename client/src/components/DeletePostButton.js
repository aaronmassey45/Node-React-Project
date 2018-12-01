import React from 'react';
import { Mutation } from 'react-apollo';

import DELETE_CHOWT from '../mutations/DeleteChowt';
import FETCH_USER_QUERY from '../queries/FetchUser';
import GET_POSTS from '../queries/GetPosts';

const DeletePostButton = ({ id, username, updateAlert, show }) => {
  return (
    <Mutation
      mutation={DELETE_CHOWT}
      onError={err => {
        updateAlert({ bg: 'danger', msg: err.graphQLErrors });
        show();
      }}
    >
      {deleteChowt => (
        <i
          className="fa fa-trash fake-link"
          onClick={() =>
            deleteChowt({
              variables: { id },
              refetchQueries: [
                { query: FETCH_USER_QUERY, variables: { username } },
                { query: GET_POSTS },
              ],
            })
          }
        />
      )}
    </Mutation>
  );
};

export default DeletePostButton;
