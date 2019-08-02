import React from 'react';
import { Query } from 'react-apollo';

import HomePage from './Homepage';

import CURRENT_USER from '../../queries/CurrentUser';
import GET_USERS_FEED from '../../queries/getUsersFeed';

const HomePageContainer = () => (
  <Query query={GET_USERS_FEED}>
    {({ loading: loadingOne, data: { populateFeed: posts }, fetchMore }) => (
      <Query query={CURRENT_USER} variables={{ withLikedPosts: true }}>
        {({ loading: loadingTwo, data: { me } }) => (
          <HomePage
            isLoading={loadingOne || loadingTwo}
            currentUser={me || {}}
            posts={posts || []}
            onLoadMore={() => {
              fetchMore({
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
        )}
      </Query>
    )}
  </Query>
);

export default HomePageContainer;
