import React, { Component } from 'react';
import axios from 'axios';
import Rater from 'react-rater';
import { Query } from 'react-apollo';

import Post from './Post';
import Chowt from './Chowt';
import FETCH_USER from '../queries/FetchUser';
import CURRENT_USER from '../queries/CurrentUser';

export default class User extends Component {
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

  renderPosts = (fetchedUser, currentUser) => {
    const { posts, username, profileImg, id } = fetchedUser;

    if (posts.length === 0) {
      return (
        <div className="list-group-item">This user has not chowted yet!</div>
      );
    }

    return posts
      .map(post => {
        return (
          <div key={post.id} className="list-group-item">
            <Post
              post={post}
              profile={{ username, profileImg, id }}
              me={currentUser.me}
            />
          </div>
        );
      })
      .reverse();
  };

  render() {
    const { history, match } = this.props;

    return (
      <Query query={FETCH_USER} variables={{ username: match.params.username }}>
        {({ loading: fetchLoading, error: fetchErr, data: fetchedUser }) => (
          <Query query={CURRENT_USER} variables={{ withLikedPosts: true }}>
            {({
              loading: currentLoading,
              error: currentErr,
              data: currentUser,
            }) => {
              if (fetchLoading || currentLoading) {
                return <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />;
              }

              const { user } = fetchedUser;

              if (!user) {
                history.push(`/404/user/${match.params.username}`);
                return;
              }

              const authenticated =
                currentUser.me && user.id === currentUser.me.id;

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
                                interactive={
                                  user.isAFoodTruck && !!currentUser.me
                                }
                              />
                              <p>
                                <small>
                                  Rated {user.rating.average} out of 5!
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
                            <Chowt user={user} />
                          </div>
                        )}
                        {this.renderPosts(user, currentUser)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          </Query>
        )}
      </Query>
    );
  }
}
