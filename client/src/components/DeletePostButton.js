import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import DELETE_CHOWT from '../graphql/mutations/DeleteChowt';
import FETCH_USER_QUERY from '../graphql/queries/FetchUser';
import GET_USERS_FEED from '../graphql/queries/getUsersFeed';

const DeletePostButton = ({ id, username, updateAlert, show }) => {
  const [deleteChowt] = useMutation(DELETE_CHOWT, {
    variables: { id },
    refetchQueries: [
      { query: FETCH_USER_QUERY, variables: { username } },
      { query: GET_USERS_FEED },
    ],
    onError: err => {
      updateAlert({ bg: 'danger', msg: err.graphQLErrors });
      show();
    },
  });

  return <i className="fa fa-trash fake-link" onClick={deleteChowt} />;
};

DeletePostButton.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  updateAlert: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
};

export default DeletePostButton;
