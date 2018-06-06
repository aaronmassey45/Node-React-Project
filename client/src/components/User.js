import React, { Component } from 'react';
import axios from 'axios';
import Rater from 'react-rater';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql, compose } from 'react-apollo';

import Post from './post';
import Chowt from './chowt';
import { getUser, isUserAuthenticated } from '../store/actions';
import FetchUser from '../queries/FetchUser';
import CurrentUser from '../queries/CurrentUser';

class User extends Component {
  rateUser = async rate => {
    try {
      if (rate.type === 'click') {
        const token = localStorage.getItem('x-auth');
        const headers = { 'x-auth': token };
        await axios.patch(
          `/api/rate/user/${this.state.user._id}`,
          { rating: rate.rating },
          { headers }
        );
        this.state.isAuthed
          ? this.props.isUserAuthenticated()
          : this.props.getUser(this.props.match.params.username);
      }
    } catch (err) {
      console.log(err);
    }
  };

  renderPosts = () => {
    const { posts, username, profileImg } = this.props.FetchUserQuery.user;

    return posts
      .map(post => {
        return (
          <div key={post.id} className="list-group-item">
            <Post post={post} profile={{ username, profileImg }} id={post.id} />
          </div>
        );
      })
      .reverse();
  };

  render() {
    const { CurrentUserQuery, FetchUserQuery } = this.props;

    if (CurrentUserQuery.loading || FetchUserQuery.loading) {
      return <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />;
    }

    const user = { ...FetchUserQuery.user };
    const authenticated =
      CurrentUserQuery.me && user.id === CurrentUserQuery.me.id;
    const authorized = !!CurrentUserQuery.me;

    return (
      <div className="mt-3">
        <div className="row p-3 m-0">
          <div className="col-xs-12 col-sm-4">
            <div className="card">
              <img
                src={user.profileImg}
                alt="header"
                className="card-img-top"
              />
              <div className="card-body">
                <div>
                  <b>{user.username}</b>
                </div>
                <div>{user.bio}</div>
                <div>{user.location}</div>
                {user.isAFoodTruck && (
                  <div>
                    <Rater
                      total={5}
                      onRate={this.rateUser}
                      rating={parseFloat(user.rating.average)}
                      interactive={user.isAFoodTruck && authorized}
                    />
                    <p>
                      <small>
                        Rated <span>{user.rating.average}</span> out of 5!
                      </small>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-8">
            <div className="card">
              {authenticated && (
                <div className="card-body">
                  <Chowt />
                </div>
              )}
              {this.renderPosts()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getUser, isUserAuthenticated }, dispatch);
};

export default compose(
  connect(null, mapDispatchToProps),
  graphql(FetchUser, {
    name: 'FetchUserQuery',
    options: props => ({
      variables: { username: props.match.params.username },
    }),
  }),
  graphql(CurrentUser, {
    name: 'CurrentUserQuery',
  })
)(User);
