import React, { Component } from 'react';
import { Query } from 'react-apollo';

import Post from './Post';
import CurrentUser from '../queries/CurrentUser';
import GetPosts from '../queries/GetPosts';

export default class HomePage extends Component {
  render() {
    return (
      <Query query={GetPosts}>
        {({ loading: loadingOne, data: { posts } }) => (
          <Query query={CurrentUser} variables={{ withLikedPosts: true }}>
            {({ loading: loadingTwo, data: { me } }) => (
              <div className="HomePage container mb-2">
                <h1 className="home-heading">Chowster</h1>
                <div className="card">
                  <div className="card-header">Most Recent Posts</div>
                  <div className="card-body">
                    {loadingOne || loadingTwo ? (
                      <div className="text-center">
                        <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
                      </div>
                    ) : (
                      posts.map(post => (
                        <Post
                          post={post}
                          profile={post._creator}
                          me={me}
                          key={post.id}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </Query>
        )}
      </Query>
    );
  }
}
