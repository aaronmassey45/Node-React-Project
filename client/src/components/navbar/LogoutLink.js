import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import LOGOUT from 'graphql/mutations/Logout';
import CURRENT_USER from 'graphql/queries/CurrentUser';

const LogoutLink = ({ history }) => {
  const client = useApolloClient();
  const [logout] = useMutation(LOGOUT, {
    refetchQueries: [{ query: CURRENT_USER }],
    onCompleted: () => {
      localStorage.removeItem('x-auth');
      client.cache.reset();
      history.push('/');
    },
  });

  return (
    <span className="nav-link fake-link" onClick={logout}>
      <i className="fa fa-sign-out fa-fw" />{' '}
      <span className="show-on-xl">Logout</span>
    </span>
  );
};

LogoutLink.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(LogoutLink);
