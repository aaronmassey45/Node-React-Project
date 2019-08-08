import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import Spinner from '../../components/spinner/Spinner';
import PostsList from '../../components/posts-list/PostsList';
import UserDetails from '../../components/user-details/UserDetails';

import FETCH_USER from '../../queries/FetchUser';
import CURRENT_USER from '../../queries/CurrentUser';

import './user-page.styles.scss';

const UserPage = ({ history, match }) => {
  const { loading: fetchLoading, data: fetchedUser } = useQuery(FETCH_USER, {
    variables: { username: match.params.username },
  });
  const { loading: currentLoading, data: currentUser } = useQuery(CURRENT_USER);

  if (fetchLoading || currentLoading) {
    return <Spinner />;
  }

  const { user } = fetchedUser;

  if (!user) {
    history.push(`/404/user/${match.params.username}`);
    return null;
  }

  const authenticated = !!currentUser.me && !!currentUser.me.id;

  const isMyPage = authenticated && user.id === currentUser.me.id;

  return (
    <div id="user-page">
      <div className="card">
        <UserDetails
          canFollow={!isMyPage && authenticated}
          currentUser={currentUser.me}
          user={user}
        />
        <PostsList
          posts={user.posts.reverse()}
          user={{
            id: user.id,
            username: user.username,
            profileImg: user.profileImg,
          }}
          currentUser={currentUser.me}
        />
      </div>
    </div>
  );
};

UserPage.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default UserPage;
