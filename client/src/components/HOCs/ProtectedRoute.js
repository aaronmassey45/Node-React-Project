import React from 'react';
import { Query } from 'react-apollo';
import { Route, Redirect } from 'react-router-dom';

import query from '../../queries/CurrentUser';

const PrivateRoute = ({ component: Component, redirectTo, ...rest }) => (
  <Query query={query} variables={{ withEditingData: true }}>
    {({ loading, data }) => {
      if (loading) return null;
      console.log(redirectTo);
      return (
        <Route
          {...rest}
          render={props =>
            data.me ? (
              <Component {...props} user={data.me} />
            ) : (
              <Redirect to={{ pathname: redirectTo || '/login' }} />
            )
          }
        />
      );
    }}
  </Query>
);

export default PrivateRoute;
