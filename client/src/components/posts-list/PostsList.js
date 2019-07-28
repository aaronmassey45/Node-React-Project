import React from 'react';

import Post from '../../components/Post';

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

export default PostsList;
