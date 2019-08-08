import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Route, Redirect } from 'react-router-dom';

import CURRENT_USER from '../../queries/CurrentUser';

const PrivateRoute = ({ component: Component, redirectTo, ...rest }) => {
  const { loading, data } = useQuery(CURRENT_USER);

  if (loading) return null;
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
};

export default PrivateRoute;
