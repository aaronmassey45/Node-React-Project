import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import Spinner from '../spinner/Spinner';

import SIGNUP from '../../mutations/Signup';
import LOGIN from '../../mutations/Login';
import CURRENT_USER_QUERY from '../../queries/CurrentUser';

export default class AuthForm extends Component {
  state = {
    isAFoodTruck: false,
    email: '',
    errors: null,
    password: '',
    username: '',
    hasErr: false,
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  _onCompleted = (data, refetch) => {
    const token = this.props.isSignup ? data.signup : data.login;
    localStorage.setItem('x-auth', token);
    refetch();
  };

  handleError = err => {
    if (this.props.isSignup) {
      let errors = err.graphQLErrors.map(({ message }) => message);
      if (errors.length === 1) errors = errors[0].split(',');
      this.setState({ errors });
    } else {
      this.setState({ hasErr: true });
    }
  };

  render() {
    const {
      email,
      username,
      password,
      isAFoodTruck,
      hasErr,
      errors,
    } = this.state;
    const { isSignup } = this.props;

    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, refetch, loading }) => {
          if (loading) {
            return <Spinner />;
          }

          return data.me ? (
            <Redirect to={`/users/account/${data.me.username}`} />
          ) : (
            <>
              <Mutation
                mutation={isSignup ? SIGNUP : LOGIN}
                variables={{ email, password, username, isAFoodTruck }}
                onCompleted={data => this._onCompleted(data, refetch)}
                onError={this.handleError}
              >
                {(mutation, { loading: loadingMutation }) => {
                  if (loadingMutation) return <Spinner />;

                  return (
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        mutation();
                      }}
                    >
                      {isSignup && (
                        <div className="form-group">
                          <label htmlFor="email">Email Address</label>
                          <input
                            aria-describedby="emailHelp"
                            className="form-control"
                            id="email"
                            onChange={this.handleChange}
                            placeholder="Enter email"
                            type="email"
                            value={email}
                          />
                          <small
                            id="emailHelp"
                            className="form-text text-muted text-left"
                          >
                            We'll never share your email with anyone else.
                          </small>
                        </div>
                      )}
                      <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                          autoComplete="username"
                          className="form-control"
                          id="username"
                          onChange={this.handleChange}
                          placeholder="Enter username"
                          required
                          type="text"
                          value={username}
                        />
                        {isSignup && (
                          <div className="row" id="userHelp">
                            <div className="col-6 text-left">
                              <small className="form-text text-muted">
                                Min: 4
                              </small>
                            </div>
                            <div className="col-6 text-right">
                              <small className="form-text text-muted">
                                Max: 20
                              </small>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          autoComplete="password"
                          className="form-control"
                          id="password"
                          onChange={this.handleChange}
                          placeholder="Password"
                          required
                          type="password"
                          value={password}
                        />
                        {isSignup && (
                          <small className="form-text text-muted text-left">
                            Min: 6
                          </small>
                        )}
                      </div>
                      {isSignup && (
                        <div className="form-check my-2">
                          <label className="form-check-label">
                            <input
                              checked={isAFoodTruck}
                              className="form-check-input"
                              id="isAFoodTruck"
                              onChange={this.handleChange}
                              type="checkbox"
                            />
                            Is this a food truck account?
                          </label>
                        </div>
                      )}
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        {isSignup ? 'Create Account' : 'Login!'}
                      </button>
                    </form>
                  );
                }}
              </Mutation>
              {hasErr && (
                <div className="alert alert-danger mb-0 mt-2" role="alert">
                  <small>Username or password incorrect.</small>
                </div>
              )}
              {errors && (
                <div className="alert alert-danger" role="alert">
                  {errors.map(err => (
                    <div key={err}>{err}</div>
                  ))}
                </div>
              )}
            </>
          );
        }}
      </Query>
    );
  }
}
