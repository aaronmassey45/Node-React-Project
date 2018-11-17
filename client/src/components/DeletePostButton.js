import React from 'react';
import { Mutation } from 'react-apollo';

import DELETE_CHOWT from '../mutations/DeleteChowt';

const DeletePostButton = ({ id, username, FetchUser }) => {
  return (
    <Mutation mutation={DELETE_CHOWT}>
      {deleteChowt => (
        <i
          className="fa fa-trash fake-link"
          onClick={() =>
            deleteChowt({
              variables: { id },
              refetchQueries: [{ query: FetchUser, variables: { username } }],
            })
          }
        />
      )}
    </Mutation>
  );
};

export default DeletePostButton;
