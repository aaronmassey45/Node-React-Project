import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import FormInput from '../form-input/FormInput';

import SIGNUP from '../../mutations/Signup';
import LOGIN from '../../mutations/Login';

export default class AuthForm extends Component {
  state = {
    isAFoodTruck: false,
    email: '',
    errors: null,
    password: '',
    confirmPassword: '',
    username: '',
    hasErr: false,
  };

  handleChange = ({ target: { id, value, checked } }) => {
    this.setState({ [id]: id === 'isAFoodTruck' ? checked : value });
  };

  _onCompleted = data => {
    const token = this.props.isSignup ? data.signup : data.login;
    localStorage.setItem('x-auth', token);
    this.props.refetch();
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

  handleSubmit = (e, mutation, isSignup) => {
    e.preventDefault();

    if (isSignup && this.state.password !== this.state.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    mutation();
  };

  render() {
    const {
      email,
      username,
      password,
      confirmPassword,
      isAFoodTruck,
      hasErr,
      errors,
    } = this.state;
    const { isSignup } = this.props;

    return (
      <>
        <Mutation
          mutation={isSignup ? SIGNUP : LOGIN}
          variables={{ email, password, username, isAFoodTruck }}
          onCompleted={data => this._onCompleted(data)}
          onError={this.handleError}
        >
          {(mutation, { loading: loadingMutation }) => {
            if (loadingMutation) return <Spinner />;

            return (
              <form onSubmit={e => this.handleSubmit(e, mutation, isSignup)}>
                {isSignup && (
                  <FormInput
                    id="email"
                    onChange={this.handleChange}
                    placeholder="Enter email"
                    type="email"
                    value={email}
                    label="Email Address"
                    smallText="We'll never share your email with anyone else."
                  />
                )}
                <FormInput
                  autoComplete="username"
                  className="form-control"
                  id="username"
                  onChange={this.handleChange}
                  placeholder="Enter username"
                  required
                  type="text"
                  value={username}
                  label="Username"
                  smallText={
                    isSignup && (
                      <>
                        <span>Min: 4</span>{' '}
                        <span className="right">Max: 20</span>
                      </>
                    )
                  }
                />
                <FormInput
                  autoComplete="password"
                  className="form-control"
                  id="password"
                  onChange={this.handleChange}
                  placeholder="Password"
                  required
                  type="password"
                  value={password}
                  label="Password"
                />
                {isSignup && (
                  <FormInput
                    autoComplete="password"
                    className="form-control"
                    id="confirmPassword"
                    onChange={this.handleChange}
                    placeholder="Confirm Password"
                    required
                    type="password"
                    value={confirmPassword}
                    label="Confirm Password"
                    smallText="Min: 6"
                  />
                )}
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
                <button className="btn btn-primary btn-block" type="submit">
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
  }
}

AuthForm.propTypes = {
  refetch: PropTypes.func.isRequired,
  isSignup: PropTypes.bool.isRequired,
};
