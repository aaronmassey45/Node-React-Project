import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AuthForm from './AuthForm';

const Login = ({ refetch }) => {
  return (
    <div className="container auth-form">
      <div className="row">
        <div className="col-10 col-lg-6 mx-auto mt-5 ">
          <div className="card">
            <div className="card-header">
              <h3>Login</h3>
            </div>
            <div className="card-body">
              <AuthForm isSignup={false} refetch={refetch} />
            </div>
            <div className="card-footer">
              Not yet a user? <Link to="/signup">Sign Up!</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  refetch: PropTypes.func.isRequired,
};

export default Login;
