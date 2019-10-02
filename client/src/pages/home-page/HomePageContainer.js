import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import HomePage from './Homepage';

import CURRENT_USER from '../../graphql/queries/CurrentUser';
import GET_USERS_FEED from '../../graphql/queries/getUsersFeed';

const HomePageContainer = () => {
  const {
    loading: loadingUserFeed,
    data,
    fetchMore: fetchMorePosts,
  } = useQuery(GET_USERS_FEED);
  const {
    loading: loadingCurrentUser,
    data: { me = {} },
  } = useQuery(CURRENT_USER, {
    variables: { withLikedPosts: true },
  });

  const posts = (data || {}).populateFeed || [];

  return (
    <HomePage
      isLoading={loadingUserFeed || loadingCurrentUser}
      currentUser={me}
      posts={posts}
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
