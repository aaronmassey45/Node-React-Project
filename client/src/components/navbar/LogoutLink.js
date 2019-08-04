import React from 'react';
import { Mutation, withApollo } from 'react-apollo';
import PropTypes from 'prop-types';

import CURRENT_USER from '../../queries/CurrentUser';
import LOGOUT from '../../mutations/Logout';

const LogoutLink = ({ renderIconsOnly, client }) => {
  return (
    <Mutation
      mutation={LOGOUT}
      refetchQueries={[{ query: CURRENT_USER }]}
      awaitRefetchQueries
      onCompleted={() => {
        localStorage.removeItem('x-auth');
        client.cache.reset();
      }}
      onError={err => console.log(err)}
    >
      {logout => (
        <span className="nav-link fake-link" onClick={logout}>
          <i className="fa fa-sign-out fa-fw" /> {!renderIconsOnly && 'Logout'}
        </span>
      )}
    </Mutation>
  );
};

LogoutLink.propTypes = {
  renderIconsOnly: PropTypes.bool.isRequired,
  client: PropTypes.object.isRequired,
};

export default withApollo(LogoutLink);
