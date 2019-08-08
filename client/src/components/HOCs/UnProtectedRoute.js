import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';

import CURRENT_USER from '../../queries/CurrentUser';

const UnProtectedRoute = ({ component: Component, ...rest }) => {
  const { loading, data, ...queryProps } = useQuery(CURRENT_USER);

  if (loading) return <Spinner />;
  return (
    <Route
      {...rest}
      render={props =>
        data.me ? (
          <Redirect to={{ pathname: '/home' }} />
        ) : (
          <Component {...props} {...queryProps} />
        )
      }
    />
  );
};

UnProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default UnProtectedRoute;
