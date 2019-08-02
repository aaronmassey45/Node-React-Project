import React from 'react';
import PropTypes from 'prop-types';

import Post from './../../components/post/Post';
import Spinner from '../../components/spinner/Spinner';
import Chowt from '../../components/chowt-component/Chowt';

import './home-page.styles.scss';

const handleScroll = ({ currentTarget }, onLoadMore) => {
  if (
    currentTarget.scrollTop + currentTarget.clientHeight >=
    currentTarget.scrollHeight
  ) {
    onLoadMore();
  }
};

const HomePage = ({ isLoading, posts, currentUser, onLoadMore }) => (
  <div id="home-page" onScroll={e => handleScroll(e, onLoadMore)}>
    <div className="card">
      <div className="list-header">
        <span className="chowster-font">Chowster</span> - Home
      </div>
      <div className="list-group-item p-0">
        <Chowt />
      </div>
      {isLoading ? (
        <div className="list-group-item">
          <Spinner />
        </div>
      ) : (
        posts.map(post => {
          return (
            <div key={post.id} className="list-group-item">
              <Post post={post} profile={post._creator} me={currentUser} />
            </div>
          );
        })
      )}
    </div>
  </div>
);

HomePage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentUser: PropTypes.object.isRequired,
  onLoadMore: PropTypes.func.isRequired,
};

export default HomePage;
