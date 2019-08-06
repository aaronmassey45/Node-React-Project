import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../../components/spinner/Spinner';
import { default as ChowtForm } from '../../components/chowt-form/ChowtFormContainer';
import PostsList from '../../components/posts-list/PostsList';

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
      <div className="list-group-item">
        <ChowtForm />
      </div>
      {isLoading ? (
        <div className="list-group-item">
          <Spinner />
        </div>
      ) : (
        <PostsList posts={posts} currentUser={currentUser} />
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
