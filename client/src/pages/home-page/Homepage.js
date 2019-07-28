import React from 'react';
import { Query } from 'react-apollo';

import Post from './../../components/Post';
import CurrentUser from '../../queries/CurrentUser';
import GetPosts from '../../queries/GetPosts';
import Spinner from '../../components/spinner/Spinner';

import './home-page.styles.scss';

const HomePage = () => (
  <Query query={GetPosts}>
    {({ loading: loadingOne, data: { posts } }) => (
      <Query query={CurrentUser} variables={{ withLikedPosts: true }}>
        {({ loading: loadingTwo, data: { me } }) => (
          <div className="HomePage container mb-2">
            <h1 className="chowster-font">Chowster</h1>
            <div className="card">
              <div className="card-header">Most Recent Posts</div>
              {loadingOne || loadingTwo ? (
                <div className="list-group-item">
                  <Spinner />
                </div>
              ) : (
                posts
                  .map(post => {
                    return (
                      <div key={post.id} className="list-group-item">
                        <Post post={post} profile={post._creator} me={me} />
                      </div>
                    );
                  })
                  .reverse()
              )}
            </div>
          </div>
        )}
      </Query>
    )}
  </Query>
);

export default HomePage;
