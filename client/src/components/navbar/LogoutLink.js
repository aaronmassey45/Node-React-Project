import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import CURRENT_USER from '../../queries/CurrentUser';
import LOGOUT from '../../mutations/Logout';

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
      <span className="hide-on-md">Logout</span>
    </span>
  );
};

LogoutLink.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(LogoutLink);
