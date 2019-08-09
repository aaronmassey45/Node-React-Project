import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import FormInput from '../form-input/FormInput';

import SIGNUP from '../../mutations/Signup';
import LOGIN from '../../mutations/Login';

import './auth-form.styles.scss';

const INITIAL_FORM_STATE = {
  isAFoodTruck: false,
  email: '',
  password: '',
  confirmPassword: '',
  username: '',
};

const AuthForm = ({ isSignup, refetch }) => {
  const [inputValues, setInputValues] = useState({ ...INITIAL_FORM_STATE });
  const [inputErrors, setInputErrors] = useState([]);
  const [mutationHasError, setMutationHasError] = useState(false);

  const handleChange = ({ target: { id, value, checked } }) => {
    setInputValues({
      ...inputValues,
      [id]: id === 'isAFoodTruck' ? checked : value,
    });
  };

  const _onCompleted = data => {
    const token = isSignup ? data.signup : data.login;
    localStorage.setItem('x-auth', token);
    refetch();
  };

  const handleErrors = err => {
    if (isSignup) {
      const graphQLErrors = err.graphQLErrors.map(({ message }) => message);
      if (graphQLErrors.length === 1) {
        const errors = graphQLErrors[0].split(',');
        setInputErrors([...errors]);
      }
    } else {
      setMutationHasError(true);
    }
  };

  const handleSubmit = (e, mutation, isSignup) => {
    e.preventDefault();

    if (isSignup && inputValues.password !== inputValues.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    mutation();
  };

  const {
    email,
    username,
    password,
    confirmPassword,
    isAFoodTruck,
  } = inputValues;

  const authMutation = isSignup ? SIGNUP : LOGIN;
  const [mutation, { loading }] = useMutation(authMutation, {
    variables: { email, password, username, isAFoodTruck },
    onCompleted: data => _onCompleted(data),
    onError: handleErrors,
  });

  if (loading) return <Spinner />;

  return (
    <>
      <form onSubmit={e => handleSubmit(e, mutation, isSignup)}>
        {isSignup && (
          <FormInput
            id="email"
            onChange={handleChange}
            placeholder="Enter email"
            type="email"
            value={email}
            label="Email Address"
          >
            <small className="form-text text-muted text-left flex">
              We&apos;ll never share your email with anyone else.
            </small>
          </FormInput>
        )}
        <FormInput
          autoComplete="username"
          className="form-control"
          id="username"
          onChange={handleChange}
          placeholder="Enter username"
          required
          type="text"
          value={username}
          label="Username"
        >
          <small className="form-text text-muted text-left flex">
            <span>Min: 4</span> <span className="right">Max: 20</span>
          </small>
        </FormInput>
        <FormInput
          autoComplete="password"
          className="form-control"
          id="password"
          onChange={handleChange}
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
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            type="password"
            value={confirmPassword}
            label="Confirm Password"
          >
            <small className="form-text text-muted text-left flex">
              Min: 6
            </small>
          </FormInput>
        )}
        {isSignup && (
          <div className="form-check my-2">
            <label className="form-check-label">
              <input
                checked={isAFoodTruck}
                className="form-check-input"
                id="isAFoodTruck"
                onChange={handleChange}
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
      {mutationHasError && (
        <div className="alert alert-danger mb-0 mt-2" role="alert">
          <small>Username or password incorrect.</small>
        </div>
      )}
      {inputErrors.length > 0 && (
        <div className="alert alert-danger" role="alert">
          {inputErrors.map(err => (
            <div key={err}>{err}</div>
          ))}
        </div>
      )}
    </>
  );
};

AuthForm.propTypes = {
  refetch: PropTypes.func.isRequired,
  isSignup: PropTypes.bool.isRequired,
};

export default AuthForm;
