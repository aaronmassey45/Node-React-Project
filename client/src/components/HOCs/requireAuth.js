import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default WrappedComponent => {
  class RequireAuth extends Component {
    static getDerivedStateFromProps(props, state) {
      if (props.loading !== null) {
        //loading is boolean
        if (!props.loading && !props.user) {
          props.history.push('/login');
        }
      }
      return null;
    }

    render() {
      return <WrappedComponent />;
    }
  }

  const mapStateToProps = ({ appState }) => ({
    user: appState.user._id,
    loading: appState.isFetching,
  });

  return withRouter(connect(mapStateToProps)(RequireAuth));
};
