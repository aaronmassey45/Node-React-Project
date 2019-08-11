import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import Tabs from '../../components/tabs/Tabs';
import TabContent from '../../components/tab-content/TabContent';

import GET_FOLLOWERS from '../../graphql/queries/getFollowers';

import './followers-page.styles.scss';

const FollowersPage = ({ match }) => {
  const page = match.url.split('/').slice(-1)[0];
  const getUsersFollowing = page === 'following';

  const {
    data: { getFollowers },
    loading,
  } = useQuery(GET_FOLLOWERS, { variables: { getUsersFollowing } });

  const { username } = match.params;
  return (
    <div id="followers-page">
      <div className="header">@{username}</div>
      <Tabs
        linkNames={['followers', 'following']}
        defaultTab={page}
        username={username}
      />
      <TabContent loading={loading} users={getFollowers || []} />
    </div>
  );
};

FollowersPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default FollowersPage;
