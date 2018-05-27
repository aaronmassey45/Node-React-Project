import React, { Component } from 'react';
import { connect } from 'react-redux';
import Rater from 'react-rater';

import PostList from './posts-list';
import Chowt from './chowt';
import 'react-rater/lib/react-rater.css';

class MyAccount extends Component {
  render() {
    const { isFetching, user } = this.props.appState;
    if (isFetching) return <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />;

    return (
      <div className="MyAccount">
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
                {user.isAFoodTruck ? (
                  <div>
                    <Rater
                      total={5}
                      interactive={false}
                      rating={parseFloat(user.rating.average)}
                    />
                    <p>
                      <small>
                        Rated <span>{user.rating.average}</span> out of 5!
                      </small>
                    </p>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-8">
            <div className="card">
              <div className="card-body">
                <Chowt />
              </div>
              <PostList type="user" id={user._id} showDelete={true} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appState: state.appState,
});

export default connect(mapStateToProps)(MyAccount);
