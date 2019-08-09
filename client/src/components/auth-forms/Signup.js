import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AuthForm from './AuthForm';

const Signup = ({ refetch }) => {
  return (
    <div className="container my-1 auth-form">
      <div className="row">
        <div className="col-10 col-lg-6 mx-auto">
          <div className="card">
            <div className="card-header">
              <h3>Sign Up</h3>
            </div>
            <div className="card-body">
              <AuthForm isSignup={true} refetch={refetch} />
            </div>
            <div className="card-footer">
              Already a user? <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Signup.propTypes = {
  refetch: PropTypes.func.isRequired,
};

export default Signup;
