import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPosts } from '../store/actions/postActions';
import Post from './post';

class PostList extends Component {
  renderPost = postData => {
    return (
      <div key={postData._id} className="list-group-item">
        <Post post={postData} id={postData._id} />
      </div>
    );
  };

  render() {
    const { id, type } = this.props;

    const posts =
      type === 'user'
        ? this.props.posts.filter(post => post._creator === id)
        : [];

    return (
      <div className="list-group list-group-flush">
        {type === 'user' ? (
          posts.length !== 0 ? (
            posts.map(this.renderPost)
          ) : (
            <div className="list-group list-group-flush">
              <div className="list-group-item">
                This user hasn't chowted yet!
              </div>
            </div>
          )
        ) : (
          this.props.posts.map(this.renderPost)
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchPosts }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
