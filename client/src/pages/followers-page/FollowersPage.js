import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import TabContent from '../../components/tab-content/TabContent';
import Tabs from '../../components/tabs/Tabs';
import CURRENT_USER from '../../graphql/queries/CurrentUser';
import GET_USERS_FOLLOWERS from '../../graphql/queries/getUsersFollowers';
import GET_USERS_FOLLOWING from '../../graphql/queries/getUsersFollowing';

import './followers-page.styles.scss';

const FollowersPage = ({ match, history }) => {
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

  const handleTabClick = () => {
    const NAVIGATE_URL = `/${username}/follow`;
    const url = NAVIGATE_URL + (page === 'following' ? 'ers' : 'ing');
    history.replace(url);
  };

  return (
    <div id="followers-page">
      <div className="header">
        <Link to={`/users/account/${username}`}>@{username}</Link>
      </div>
      <Tabs
        tabNames={['following', 'followers']}
        activeTab={page}
        handleClick={handleTabClick}
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
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default FollowersPage;
