import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import CURRENT_USER from '../../queries/CurrentUser';

import './compose-chowt-link.styles.scss';

const ComposeChowtLink = () => (
  <Query query={CURRENT_USER} variables={{ withEditingData: true }}>
    {({ loading, data }) => {
      if (loading || (!loading && !data.me)) return null;

      return (
        <div id="compose-chowt-link">
          <Link className="btn btn-gray fake-link" to="/compose/chowt">
            <i className="fas fa-bullhorn" />
          </Link>
        </div>
      );
    }}
  </Query>
);

export default ComposeChowtLink;
