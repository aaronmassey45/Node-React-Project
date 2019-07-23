import React from 'react';
import { Query, Mutation } from 'react-apollo';

import Navbar from './Navbar';
import AuthedButtons from './AuthedButtons';
import UnauthedButtons from './UnauthedButtons';
import Spinner from '../spinner/Spinner';
import CURRENT_USER from '../../queries/CurrentUser';
import LOGOUT from '../../mutations/Logout';

const NavbarContainer = () => (
  <Query query={CURRENT_USER} onError={err => console.log(err)}>
    {({ data, loading, error: errorQuery }) => (
      <Mutation
        mutation={LOGOUT}
        refetchQueries={[{ query: CURRENT_USER }]}
        awaitRefetchQueries
        onCompleted={() => {
          localStorage.removeItem('x-auth');
        }}
        onError={err => console.log(err)}
      >
        {(logout, { error: errorMutation }) => {
          if (loading) return <Spinner />;
          if (errorQuery || errorMutation) {
            return <div>Error</div>;
          }

          const navButtons = data.me ? (
            <AuthedButtons logout={logout} username={data.me.username} />
          ) : (
            <UnauthedButtons />
          );

          return <Navbar navButtons={navButtons} />;
        }}
      </Mutation>
    )}
  </Query>
);

export default NavbarContainer;
