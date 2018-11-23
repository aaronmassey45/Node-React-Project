import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="NotFound">
    <h1>404 Not Found</h1>
    <h3>The page you are looking for does not exist</h3>
    <h5>
      <Link className="btn btn-secondary" to="/">
        Return home
      </Link>
    </h5>
  </div>
);

export default NotFound;