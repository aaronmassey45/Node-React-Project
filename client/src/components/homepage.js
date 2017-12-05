import React, {Component} from 'react';

import PostList from './posts-list';

export default class HomePage extends Component {
  render () {
    return (
      <div className="HomePage">
        <h1>Welcome to Chowster</h1>
        <div className="card">
          <div className="card-header">Most Recent Posts</div>
          <PostList type='home' />
        </div>
      </div>
    );
  }
}
