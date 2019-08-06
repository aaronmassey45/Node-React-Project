import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './under-development.styles.scss';

const UnderDevelopment = ({ goBack, page }) => (
  <div id="under-development" className="img-overlay">
    <div className="img-container" />
    <div className="img-text">
      <div>This page, {page}, is currently under development!</div>
    </div>
    <div className="nav-buttons">
      <button className="btn btn-primary" onClick={goBack}>
        Go Back
      </button>
      <Link className="btn btn-secondary" to="/">
        Home
      </Link>
    </div>
  </div>
);

UnderDevelopment.propTypes = {
  goBack: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
};

export default UnderDevelopment;
