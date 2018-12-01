import React from 'react';
import { Query } from 'react-apollo';
import { Route, Redirect } from 'react-router-dom';

import query from '../../queries/CurrentUser';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Query query={query} variables={{ withEditingData: true }}>
    {({ loading, data }) => {
      if (loading) return null;
      return (
        <Route
          {...rest}
          render={props =>
            data.me ? (
              <Component {...props} user={data.me} />
            ) : (
              <Redirect to={{ pathname: '/login' }} />
            )
          }
        />
      );
    }}
  </Query>
);

export default PrivateRoute;
