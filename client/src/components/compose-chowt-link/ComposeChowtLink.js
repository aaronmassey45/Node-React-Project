import React from 'react';
import { Link } from 'react-router-dom';

import './compose-chowt-link.styles.scss';

const ComposeChowtLink = () => (
  <div id="compose-chowt-link">
    <Link className="btn btn-gray fake-link" to="/compose/chowt">
      <i className="fas fa-bullhorn" />
    </Link>
  </div>
);

export default ComposeChowtLink;
