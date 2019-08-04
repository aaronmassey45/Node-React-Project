import React from 'react';
import { Query } from 'react-apollo';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';

import query from '../../queries/CurrentUser';

const UnProtectedRoute = ({ component: Component, ...rest }) => (
  <Query query={query}>
    {({ loading, data, ...queryProps }) => {
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
    }}
  </Query>
);

UnProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

export default UnProtectedRoute;
