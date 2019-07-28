import React from 'react';
import PropTypes from 'prop-types';

import Post from '../../components/post/Post';

import './posts-lists.styles.scss';

const PostsList = ({ fetchedUser, currentUser }) => {
  const { posts, username, profileImg, id } = fetchedUser;

  return posts.length === 0 ? (
    <div className="list-group-item">This user has not chowted yet!</div>
  ) : (
    posts
      .map(post => (
        <div className="list-group-item" key={post.id}>
          <Post
            post={post}
            profile={{ username, profileImg, id }}
            me={currentUser}
          />
        </div>
      ))
      .reverse()
  );
};

PostsList.propTypes = {
  fetchedUser: PropTypes.object,
  currentUser: PropTypes.object,
};

export default PostsList;
