import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import CURRENT_USER from '../queries/CurrentUser';

const LandingPage = () => {
  const { data, loading } = useQuery(CURRENT_USER);

  if (loading) return <div />;

  return data.me ? (
    <Redirect to="/home" />
  ) : (
    <div className="landing-page text-white row container mx-auto">
      <div id="welcome" className="col-12 ubuntu">
        Welcome to <div className="chowster-font">Chowster</div>
      </div>
      <div className="col-6">
        Not a member?
        <div>
          <Link to="/signup">Sign up!</Link>
        </div>
      </div>
      <div className="col-6">
        Have an account?
        <div>
          <Link to="/login">Log in!</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
