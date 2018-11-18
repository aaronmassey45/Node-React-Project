import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Alert from './alert';
import addAlertProps from './HOCs/add-alert';
import LikePostButton from './LikePostButton';
import DeletePostButton from './DeletePostButton';

class Post extends Component {
  getTimeDifference = time => {
    const now = moment(new Date().getTime());
    const createdAt = moment(time);

    return now.diff(createdAt, 'days') >= 30
      ? moment(time).format('MMM DD, YYYY')
      : moment(time).fromNow();
  };

  render() {
    const {
      alert: { msg, bg },
      hide,
      me,
      post,
      profile,
      show,
      showModal,
      updateAlert,
    } = this.props;

    const timeString = this.getTimeDifference(
      new Date(Number(post.timeCreated))
    );

    const iLiked = me && me.likedPosts.find(postObj => postObj.id === post.id);

    return (
      <Fragment>
        {showModal && <Alert closeModal={hide} msg={msg} bg={bg} />}
        <div className="Post">
          <div className="row">
            <div className="col-3 my-auto">
              <img
                src={profile.profileImg}
                alt="user"
                className="rounded float-left img-fluid"
              />
            </div>
            <div className="col-9 my-auto itim-font">
              <div className="text-left row">
                <span className="col-10">
                  <Link to={`/users/account/${profile.username}`}>
                    @{profile.username}
                  </Link>
                </span>
                {me &&
                  profile.id === me.id && (
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
                  {post.location &&
                    post.location.lat && (
                      <p className="mb-0">
                        <small>
                          <a
                            href={`https://www.google.com/maps?q=${
                              post.location.lat
                            },${post.location.lng}`}
                            target="_blank"
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
      </Fragment>
    );
  }
}

export default addAlertProps(Post);
