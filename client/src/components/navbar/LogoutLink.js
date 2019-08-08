import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

import CURRENT_USER from '../../queries/CurrentUser';
import LOGOUT from '../../mutations/Logout';

const LogoutLink = () => {
  const client = useApolloClient();
  const [logout] = useMutation(LOGOUT, {
    refetchQueries: [{ query: CURRENT_USER }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      localStorage.removeItem('x-auth');
      client.cache.reset();
    },
  });

  return (
    <span className="nav-link fake-link" onClick={logout}>
      <i className="fa fa-sign-out fa-fw" />{' '}
      <span className="hide-on-md">Logout</span>
    </span>
  );
};

export default LogoutLink;
