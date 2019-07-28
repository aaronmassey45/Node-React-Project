import React from 'react';
import { Query } from 'react-apollo';

import Post from './../../components/post/Post';
import CurrentUser from '../../queries/CurrentUser';
import Spinner from '../../components/spinner/Spinner';
import Chowt from '../../components/chowt-component/Chowt';

import GET_POSTS from '../../queries/GetPosts';

import './home-page.styles.scss';

const HomePage = () => (
  <Query query={GET_POSTS}>
    {({ loading: loadingOne, data: { posts } }) => (
      <Query query={CurrentUser} variables={{ withLikedPosts: true }}>
        {({ loading: loadingTwo, data: { me } }) => (
          <div id="home-page" className="container mb-2">
            <div className="card">
              <div className="list-header">
                <span className="chowster-font">Chowster</span> - Home
              </div>
              <div className="list-group-item p-0">
                <Chowt />
              </div>
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
