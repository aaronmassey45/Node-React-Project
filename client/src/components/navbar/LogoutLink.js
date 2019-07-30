import React from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import CURRENT_USER from '../../queries/CurrentUser';
import LOGOUT from '../../mutations/Logout';

const LogoutLink = ({ renderIconsOnly }) => {
  return (
    <Mutation
      mutation={LOGOUT}
      refetchQueries={[{ query: CURRENT_USER }]}
      awaitRefetchQueries
      onCompleted={() => {
        localStorage.removeItem('x-auth');
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
};

export default LogoutLink;
