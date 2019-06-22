import React from 'react';
import { Link } from 'react-router-dom';

import AuthForm from './AuthForm';

const Login = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 mx-auto mt-5 ">
          <div className="card">
            <div className="card-header">
              <h3>Login</h3>
            </div>
            <div className="card-body">
              <AuthForm isSignup={false} />
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

export default Login;
