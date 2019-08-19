import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import Tabs from '../../components/tabs/Tabs';
import TabContent from '../../components/tab-content/TabContent';

import GET_USERS_FOLLOWERS from '../../graphql/queries/getUsersFollowers';
import GET_USERS_FOLLOWING from '../../graphql/queries/getUsersFollowing';
import CURRENT_USER from '../../graphql/queries/CurrentUser';

import './followers-page.styles.scss';

const FollowersPage = ({ match }) => {
  const [page] = match.url.split('/').slice(-1);
  const { username } = match.params;

  const query =
    page === 'following' ? GET_USERS_FOLLOWING : GET_USERS_FOLLOWERS;

  const {
    data: { me = {} },
  } = useQuery(CURRENT_USER);

  const {
    data: { user = {} },
    loading,
  } = useQuery(query, { variables: { username } });

  return (
    <div id="followers-page">
      <div className="header">@{username}</div>
      <Tabs
        linkNames={['following', 'followers']}
        defaultTab={page}
        username={username}
      />
      <TabContent
        loading={loading}
        users={user[page] || []}
        currentUser={me.id || ''}
      />
    </div>
  );
};

FollowersPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default FollowersPage;
