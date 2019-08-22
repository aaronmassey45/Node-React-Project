import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import PostsList from '../../components/posts-list/PostsList';
import Spinner from '../../components/spinner/Spinner';
import { default as TabContent } from '../../components/tab-content/TabContentV2';
import { default as Tabs } from '../../components/tabs/Tabs-v2';
import UserDetails from '../../components/user-details/UserDetails';
import FETCH_USER from '../../graphql/queries/FetchUser';
import CURRENT_USER from '../../graphql/queries/CurrentUser';

import './user-page.styles.scss';

const UserPage = ({ history, match }) => {
  const [activeTab, setActiveTab] = useState('chowts');
  const { loading: fetchLoading, data: fetchedUser } = useQuery(FETCH_USER, {
    variables: { username: match.params.username },
  });
  const { loading: currentLoading, data: currentUser } = useQuery(CURRENT_USER);

  if (fetchLoading || currentLoading) {
    return <Spinner />;
  }

  const { user } = fetchedUser;

  if (!user) {
    return history.push(`/404/user/${match.params.username}`);
  }

  const isAuthenticated = !!currentUser.me && !!currentUser.me.id;

  const isMyPage = isAuthenticated && user.id === currentUser.me.id;

  const postsToRender = activeTab === 'likes' ? user.likedPosts : user.posts;
  const hasOneUser = activeTab === 'chowts';

  return (
    <div id="user-page">
      <div className="card">
        <UserDetails
          canFollow={!isMyPage && isAuthenticated}
          currentUser={currentUser.me}
          user={user}
        />
        <Tabs
          tabNames={['chowts', 'likes']}
          activeTab={activeTab}
          handleClick={setActiveTab}
        />
        <TabContent>
          <PostsList
            currentUser={currentUser.me}
            posts={postsToRender}
            user={hasOneUser ? user : null}
          />
        </TabContent>
      </div>
    </div>
  );
};

UserPage.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default UserPage;
