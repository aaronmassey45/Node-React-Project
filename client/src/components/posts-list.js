import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPosts } from '../store/actions/postActions';
import Post from './post';

class PostList extends Component {
  state = {
    users: [],
  };

  async componentDidMount() {
    try {
      this.props.fetchPosts();
      const users = await axios.get('/api/userlist');
      this.setState({ users });
    } catch (err) {
      console.log(err);
    }
  }

  renderPost = postData => {
    if (!this.state.users.data) return;
    let profile = this.state.users.data.find(x => x._id === postData._creator);
    return (
      <div key={postData._id} className="list-group-item">
        <Post post={postData} profile={profile} id={postData._id} />
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
