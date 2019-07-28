import React, { memo, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Alert from './Alert';
import addAlertProps from './HOCs/add-alert';
import LikePostButton from './LikePostButton';
import DeletePostButton from './DeletePostButton';
import getTimeDifference from '../utils/getTimeDifference';

const Post = ({
  alert: { msg, bg },
  hide,
  me,
  post,
  profile,
  show,
  showModal,
  updateAlert,
}) => {
  const timeString = getTimeDifference(new Date(Number(post.timeCreated)));

  const iLiked = me && me.likedPosts.find(postObj => postObj.id === post.id);

  return (
    <Fragment>
      {showModal && <Alert closeModal={hide} msg={msg} bg={bg} />}
      <div className="Post">
        <div className="media">
          <img
            src={profile.profileImg}
            alt="user avatar"
            className="rounded mx-3 img-fluid"
          />
          <div className="media-body container">
            <div className="my-auto itim-font">
              <div className="text-left row">
                <span className="col-10">
                  <Link
                    to={`/users/account/${profile.username}`}
                    className="text-white"
                  >
                    <b>@{profile.username}</b>
                  </Link>
                </span>
                {me && profile.id === me.id && (
                  <span className="col-2 text-right">
                    <DeletePostButton
                      id={post.id}
                      show={show}
                      updateAlert={updateAlert}
                      username={profile.username}
                    />
                  </span>
                )}
              </div>
              <div className="row text-left">
                <div className="col-12 mt-1">
                  {post.text}
                  {post.location && post.location.lat && (
                    <p className="mb-0">
                      <small>
                        <a
                          href={`https://www.google.com/maps?q=${post.location.lat},${post.location.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
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
                    show={show}
                    updateAlert={updateAlert}
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
      </div>
    </Fragment>
  );
};

export default addAlertProps(memo(Post));
