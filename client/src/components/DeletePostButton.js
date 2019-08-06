import React from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import DELETE_CHOWT from '../mutations/DeleteChowt';
import FETCH_USER_QUERY from '../queries/FetchUser';
import GET_USERS_FEED from '../queries/getUsersFeed';

const DeletePostButton = ({ id, username, updateAlert, show }) => (
  <Mutation
    mutation={DELETE_CHOWT}
    variables={{ id }}
    onError={err => {
      updateAlert({ bg: 'danger', msg: err.graphQLErrors });
      show();
    }}
    refetchQueries={[
      { query: FETCH_USER_QUERY, variables: { username } },
      { query: GET_USERS_FEED },
    ]}
  >
    {deleteChowt => (
      <i className="fa fa-trash fake-link" onClick={deleteChowt} />
    )}
  </Mutation>
);

DeletePostButton.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  updateAlert: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
};

export default DeletePostButton;
