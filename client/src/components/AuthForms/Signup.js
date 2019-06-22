import React from 'react';
import { Link } from 'react-router-dom';

import AuthForm from './AuthForm';

const Signup = () => {
  return (
    <div className="container my-1">
      <div className="row">
        <div className="col-10 col-lg-6 mx-auto">
          <div className="card">
            <div className="card-header">
              <h3>Sign Up</h3>
            </div>
            <div className="card-body">
              <AuthForm isSignup={true} />
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

export default Signup;
