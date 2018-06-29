import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import query from '../../queries/CurrentUser';

export default WrappedComponent => {
  class RequireAuth extends Component {
    state = {};
    static getDerivedStateFromProps(props, state) {
      if (props.data.loading !== null) {
        //loading is boolean
        if (!props.data.loading && !props.data.me) {
          props.history.push('/login');
        }
      }
      return null;
    }

    render() {
      return <WrappedComponent />;
    }
  }

  return withRouter(
    graphql(query, {
      options: props => ({
        variables: { withLikedPosts: false },
      }),
    })(RequireAuth)
  );
};
