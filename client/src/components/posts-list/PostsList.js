import React from 'react';
import PropTypes from 'prop-types';

import Post from 'components/post/Post';

import './posts-lists.styles.scss';

const PostsList = ({ posts, currentUser, user }) => {
  return posts.length === 0 ? (
    <div className="list-group-item">No chowts yet :(</div>
  ) : (
    posts.map(post => (
      <div className="list-group-item" key={post.id}>
        <Post post={post} profile={post._creator || user} me={currentUser} />
      </div>
    ))
  );
};

PostsList.propTypes = {
  currentUser: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  user: PropTypes.object,
};

export default PostsList;
