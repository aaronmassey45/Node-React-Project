import React, { Component } from 'react';
import Rater from 'react-rater';
import { Query, Mutation } from 'react-apollo';

import Post from '../../components/Post';
import Spinner from '../../components/spinner/Spinner';
import FollowButton from '../../components/follow-button/FollowButton';

import FETCH_USER from '../../queries/FetchUser';
import CURRENT_USER from '../../queries/CurrentUser';
import RATE_ACCOUNT from '../../mutations/rateAccount';

export default class UserPage extends Component {
  rateUser = ({ type, rating }, rateAccount, id) => {
    if (type === 'click') {
      rateAccount({ variables: { id, rating } });
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
                return <Spinner />;
              }

              const { user } = fetchedUser;

              if (!user) {
                history.push(`/404/user/${match.params.username}`);
                return null;
              }

              const authenticated = !!currentUser.me && !!currentUser.me.id;

              const isMyPage =
                currentUser.me && user.id === currentUser.me.id ? true : false;

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
                              <Mutation
                                mutation={RATE_ACCOUNT}
                                onError={err => console.log(err)}
                              >
                                {rateAccount => (
                                  <Rater
                                    total={5}
                                    onRate={rate =>
                                      this.rateUser(rate, rateAccount, user.id)
                                    }
                                    rating={parseFloat(user.rating.average)}
                                    interactive={
                                      user.isAFoodTruck && !!currentUser.me
                                    }
                                  />
                                )}
                              </Mutation>
                              <p>
                                <small>
                                  Rated {user.rating.average} out of 5!
                                </small>
                              </p>
                            </div>
                          )}
                          {!isMyPage && authenticated && (
                            <FollowButton
                              following={
                                !!user.followers.find(
                                  o => o.id === currentUser.me.id
                                )
                              }
                              userId={user.id}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-8">
                      <div className="card">
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