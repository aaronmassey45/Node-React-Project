import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import useSnackbar from '../../react-hooks/useSnackbar';
import DeletePostButton from '../delete-post-button/DeletePostButton';
import LikePostButton from '../like-post-button/LikePostButton';
import Snackbar from '../snackbar/Snackbar';
import getTimeDifference from '../../utils/getTimeDifference';

import './post.styles.scss';

const Post = ({ me, post, profile }) => {
  const { message, isShown, setMessageAndShowSnackbar } = useSnackbar();
  const timeString = getTimeDifference(new Date(Number(post.timeCreated)));

  const isAuthenticated = !!me;
  const likedBy = post.likedBy.map(user => user.id);
  const iLiked = isAuthenticated && likedBy.includes(me.id);

  return (
    <>
      <div className="media post">
        <img
          src={profile.profileImg}
          alt="user avatar"
          className="post-avatar align-self-center"
        />
        <div className="media-body container">
          <div className="my-auto">
            <div className="row">
              <span className="col-10">
                <Link
                  to={`/users/account/${profile.username}`}
                  className="text-white"
                >
                  <b>@{profile.username}</b>
                </Link>
              </span>
              {isAuthenticated && profile.id === me.id && (
                <span className="col-2 text-right">
                  <DeletePostButton
                    id={post.id}
                    setMessageAndShowSnackbar={setMessageAndShowSnackbar}
                    username={profile.username}
                  />
                </span>
              )}
            </div>
            <div className="row">
              <div className="col-12 mt-1">
                {post.text}
                {post.location && post.location.lat && (
                  <p className="mb-0">
                    <small>
                      <a
                        href={`https://www.google.com/maps?q=${post.location.lat},${post.location.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="location"
                      >
                        My Location
                      </a>
                    </small>
                  </p>
                )}
              </div>
              <div className="col-4 mt-1">
                <LikePostButton
                  id={post.id}
                  liked={iLiked}
                  setMessageAndShowSnackbar={setMessageAndShowSnackbar}
                  username={profile.username}
                />
                <span className="text-gray ml-2">{post.likedBy.length}</span>
              </div>
              <div className="col-8 mt-1 text-right">
                <small className="text-gray">{timeString}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar isShown={isShown} message={message} />
    </>
  );
};

Post.propTypes = {
  me: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

export default memo(Post);
