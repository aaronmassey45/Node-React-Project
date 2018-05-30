import React, { Component } from 'react';
import axios from 'axios';
import Rater from 'react-rater';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PostList from './posts-list';
import Chowt from './chowt';
import { getUser, isUserAuthenticated, clearFoundUser } from '../store/actions';

class User extends Component {
  state = {
    isAuthed: null,
    user: null,
  };

  static getDerivedStateFromProps(props, state) {
    const { authedUser, foundUser, getUser, match } = props;

    if (!foundUser) {
      getUser(match.params.username);
      return null;
    }

    if (authedUser._id === foundUser._id)
      return { isAuthed: true, user: { ...authedUser } };

    return { isAuthed: false, user: { ...foundUser } };
  }

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

  componentWillUnmount() {
    this.props.clearFoundUser();
  }

  render() {
    if (!this.state.user)
      return <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />;
    const {
      isAuthed,
      user: { bio, _id, isAFoodTruck, location, profileImg, rating, username },
    } = this.state;

    return (
      <div className="mt-3">
        <div className="row p-3 m-0">
          <div className="col-xs-12 col-sm-4">
            <div className="card">
              <img src={profileImg} alt="header" className="card-img-top" />
              <div className="card-body">
                <div>
                  <b>{username}</b>
                </div>
                <div>{bio}</div>
                <div>{location}</div>
                {isAFoodTruck && (
                  <div>
                    <Rater
                      total={5}
                      onRate={this.rateUser}
                      rating={parseFloat(rating.average)}
                      interactive={isAFoodTruck && this.props.loggedIn}
                    />
                    <p>
                      <small>
                        Rated <span>{rating.average}</span> out of 5!
                      </small>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-8">
            <div className="card">
              {isAuthed && (
                <div className="card-body">
                  <Chowt />
                </div>
              )}
              <PostList type="user" id={_id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ appState, foundUser }) => ({
  authedUser: appState.user,
  loading: appState.isFetching,
  loggedIn: appState.loggedIn,
  foundUser,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { clearFoundUser, getUser, isUserAuthenticated },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
