import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { graphql, Mutation } from 'react-apollo';
import classNames from 'classnames';

import Alert from './alert';
import addAlertProps from './HOCs/add-alert';
import CurrentUser from '../queries/CurrentUser';
import FetchUser from '../queries/FetchUser';
import LIKE_CHOWT from '../mutations/LikeChowt';
import deleteChowt from '../mutations/DeleteChowt';

class Post extends Component {
  handlePostAction = async actionType => {
    const {
      deleteChowtMutation,
      likeChowtMutation,
      show,
      updateAlert,
      profile,
      post,
    } = this.props;

    switch (actionType) {
      case 'like':
        likeChowtMutation({
          variables: { id: post.id },
          refetchQueries: [
            { query: CurrentUser, variables: { withLikedPosts: true } },
            {
              query: FetchUser,
              variables: { username: profile.username },
            },
          ],
        }).catch(err => {
          updateAlert({ bg: 'danger', msg: "Couldn't like post." });
          show();
        });
        break;
      case 'delete':
        deleteChowtMutation({
          variables: { id: post.id },
          refetchQueries: [
            { query: FetchUser, variables: { username: profile.username } },
          ],
        }).catch(err => {
          updateAlert({
            bg: 'danger',
            msg: "Couldn't delete post.",
          });
          show();
        });
        break;
      default:
        break;
    }
  };

  getTimeDifference = time => {
    const now = moment(new Date().getTime());
    const createdAt = moment(time);

    return now.diff(createdAt, 'days') >= 30
      ? moment(time).format('MMM DD, YYYY')
      : moment(time).fromNow();
  };

  render() {
    const { alert, hide, post, profile, showModal, me } = this.props;

    const timeString = this.getTimeDifference(
      new Date(Number(post.timeCreated))
    );

    const iLiked = me && me.likedPosts.find(postObj => postObj.id === post.id);

    return (
      <Fragment>
        {showModal && <Alert closeModal={hide} msg={alert.msg} bg={alert.bg} />}
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
                      <i
                        className="fa fa-trash fake-link"
                        onClick={() => this.handlePostAction('delete')}
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
                  <Mutation mutation={LIKE_CHOWT}>
                    {likeChowt => (
                      <i
                        className={classNames('fa fa-sm fake-link', {
                          'fa-heart text-danger': iLiked,
                          'fa-heart-o': !iLiked,
                        })}
                        onClick={() =>
                          likeChowt({
                            variables: { id: post.id },
                            refetchQueries: [
                              {
                                query: CurrentUser,
                                variables: { withLikedPosts: true },
                              },
                              {
                                query: FetchUser,
                                variables: { username: profile.username },
                              },
                            ],
                          })
                        }
                      />
                    )}
                  </Mutation>
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

export default graphql(deleteChowt, {
  name: 'deleteChowtMutation',
})(addAlertProps(Post));
