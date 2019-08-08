import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import HomePage from './Homepage';

import CURRENT_USER from '../../queries/CurrentUser';
import GET_USERS_FEED from '../../queries/getUsersFeed';

const HomePageContainer = () => {
  const {
    loading: loadingUserFeed,
    data: { populateFeed: posts },
    fetchMore: fetchMorePosts,
  } = useQuery(GET_USERS_FEED);
  const {
    loading: loadingCurrentUser,
    data: { me },
  } = useQuery(CURRENT_USER, {
    variables: { withLikedPosts: true },
  });

  return (
    <HomePage
      isLoading={loadingUserFeed || loadingCurrentUser}
      currentUser={me || {}}
      posts={posts || []}
      onLoadMore={() => {
        fetchMorePosts({
          variables: {
            offset: posts.length,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return {
              populateFeed: [
                ...prev.populateFeed,
                ...fetchMoreResult.populateFeed,
              ],
            };
          },
        });
      }}
    />
  );
};

export default HomePageContainer;
