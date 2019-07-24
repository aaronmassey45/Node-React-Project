import React from 'react';
import { Link } from 'react-router-dom';

import './not-found.styles.scss';

const NotFound = ({ history }) => (
  <div className="not-found-img-overlay">
    <div className="img-container" />
    <div className="img-text">
      <div>
        You tried to navigate to <u>{history.location.pathname}</u>.
      </div>
      Looks like Little King Trash Mouth found this page before you did. Better
      luck next time.
    </div>
    <div className="nav-buttons">
      <button className="btn btn-primary" onClick={history.goBack}>
        Go Back
      </button>
      <Link className="btn btn-secondary" to="/">
        Home
      </Link>
    </div>
  </div>
);

export default NotFound;
