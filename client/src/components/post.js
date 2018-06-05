import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { modifyPost, fetchPosts, fetchUsers } from '../store/actions';
import Alert from './alert';
import addAlertProps from './HOCs/add-alert';

class Post extends Component {
  handlePostAction = async actionType => {
    const {
      fetchPosts,
      id,
      loggedIn,
      modifyPost,
      show,
      updateAlert,
    } = this.props;
    if (loggedIn) {
      try {
        await modifyPost(id, actionType);
        await fetchPosts();
      } catch (err) {
        updateAlert({
          bg: 'danger',
          msg: `Couldn't ${actionType === 'PATCH' ? 'like' : 'delete'} post`,
        });
        show();
      }
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
    const { alert, hide, post, profile, showModal, user } = this.props;
    const timeString = this.getTimeDifference(
      new Date(Number(post.timeCreated))
    );

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
                {profile._id === user.id && (
                  <span className="col-2 text-right">
                    <i
                      className="fa fa-trash fake-link"
                      onClick={() => this.handlePostAction('DELETE')}
                    />
                  </span>
                )}
              </div>
              <div className="row text-left">
                <div className="col-12 mt-1">
                  {post.text}
                  {post.location && (
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
                  <i
                    className={`fa ${
                      user.likedPosts.includes(post._id)
                        ? 'fa-heart text-danger'
                        : 'fa-heart-o'
                    } fa-sm fake-link`}
                    onClick={() => this.handlePostAction('PATCH')}
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

const mapStateToProps = ({ appState }) => ({
  loggedIn: appState.loggedIn,
  user: { id: appState.user._id, likedPosts: appState.user.likedPosts },
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ modifyPost, fetchPosts, fetchUsers }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  addAlertProps(Post)
);
