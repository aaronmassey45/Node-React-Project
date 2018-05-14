import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { modifyPost, fetchPosts } from '../store/actions/postActions';
import Alert from './alert';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: {
        bg: '',
        msg: '',
      },
      liked: false,
      showAlert: false,
    };
  }

  closeModal = () => {
    this.setState({
      alert: {
        bg: '',
        msg: '',
      },
      showAlert: false,
    });
  };

  likePost = async () => {
    if (this.props.loggedIn) {
      try {
        await this.props.modifyPost(this.props.id, 'PATCH');
        await this.props.fetchPosts();
        this.setState({ liked: true });
      } catch (err) {
        this.setState({
          alert: {
            bg: 'danger',
            msg: "Couldn't like post",
          },
          showAlert: true,
        });
      }
    }
  };

  deletePost = async () => {
    try {
      await this.props.modifyPost(this.props.id, 'DELETE');
      this.props.fetchPosts();
    } catch (err) {
      this.setState({
        alert: {
          bg: 'danger',
          msg: "Couldn't delete post",
        },
        showAlert: true,
      });
    }
  };

  render() {
    const { post, profile, showDelete } = this.props;
    const { alert, liked, showAlert } = this.state;

    const heart = !liked ? '-o' : ' text-danger';
    const now = moment(new Date().getTime());
    const createdAt = moment(post.timeCreated);

    const timeString =
      now.diff(createdAt, 'days') >= 30
        ? moment(post.timeCreated).format('MMM DD, YYYY')
        : moment(post.timeCreated).fromNow();

    return (
      <div className="Post">
        {showAlert ? (
          <Alert closeModal={this.closeModal} msg={alert.msg} bg={alert.bg} />
        ) : (
          ''
        )}
        <div className="row">
          <div className="col-3 my-auto">
            <img
              src={profile.profileImg}
              alt=""
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
              {showDelete ? (
                <span className="col-2 text-right">
                  <i
                    className="fa fa-trash fake-link"
                    onClick={this.deletePost}
                  />
                </span>
              ) : (
                ''
              )}
            </div>
            <div className="row text-left">
              <div className="col-12 mt-1">
                {post.text}
                {post.location ? (
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
                ) : (
                  ''
                )}
              </div>
              <div className="col-4 mt-1">
                <i
                  className={`fa fa-heart${heart} fa-sm fake-link`}
                  onClick={this.likePost}
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
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.appState.loggedIn,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ modifyPost, fetchPosts }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
