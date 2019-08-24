import React from 'react';
import { Link } from 'react-router-dom';

import './landing-page.styles.scss';

const LandingPage = () => (
  <div id="landing-page" className="text-white row container mx-auto">
    <div id="welcome" className="col-12">
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

export default LandingPage;
