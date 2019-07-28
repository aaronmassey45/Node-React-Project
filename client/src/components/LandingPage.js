import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';

import CURRENT_USER from '../queries/CurrentUser';

const LandingPage = () => (
  <Query query={CURRENT_USER}>
    {({ data, loading }) => {
      if (loading) return <div />;

      return data.me ? (
        <Redirect to="/feed" />
      ) : (
        <div className="landing-page text-white row container mx-auto">
          <div id="welcome" className="col-12 ubuntu">
            Welcome to <div className="chowster-font display-3">Chowster</div>
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
    }}
  </Query>
);

export default LandingPage;
