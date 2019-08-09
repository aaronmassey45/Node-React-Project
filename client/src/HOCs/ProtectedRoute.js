import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import CURRENT_USER from '../graphql/queries/CurrentUser';

const PrivateRoute = ({
  component: Component,
  redirectTo = '/login',
  ...rest
}) => {
  const { loading, data } = useQuery(CURRENT_USER);

  if (loading) return null;
  return (
    <Route
      {...rest}
      render={props =>
        data.me ? (
          <Component {...props} user={data.me} />
        ) : (
          <Redirect to={{ pathname: redirectTo }} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  redirectTo: PropTypes.string,
};

export default PrivateRoute;
