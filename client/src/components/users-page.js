import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Rater from 'react-rater';

import PostList from './posts-list';
import 'react-rater/lib/react-rater.css';

export default class UserPage extends Component {
  state = {
    bio: '',
    id: '',
    isAFoodTruck: false,
    location: '',
    rating: 0,
    redirect: false,
    username: ''
  };

  componentWillMount() {
    this.getUser();
  }

  getUser = async () => {
    try {
      let res = await axios.get(
        `/users/account/${this.props.match.params.username}`
      );
      this.setState({
        bio: res.data.bio,
        id: res.data._id,
        isAFoodTruck: res.data.isAFoodTruck,
        location: res.data.location,
        profileImg: res.data.profileImg,
        rating: parseFloat(res.data.rating.average),
        username: res.data.username
      });
    } catch (err) {
      this.setState({ redirect: true });
    }
  };

  rateUser = async rate => {
    try {
      if (rate.type === 'click') {
        const token = localStorage.getItem('x-auth');
        const headers = { 'x-auth': token };
        await axios.patch(
          `/rate/user/${this.state.id}`,
          { rating: rate.rating },
          { headers }
        );
        this.getUser();
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const {
      bio,
      id,
      isAFoodTruck,
      location,
      profileImg,
      rating,
      redirect,
      username
    } = this.state;

    if (redirect)
      return <Redirect to={`/404/${this.props.match.params.username}`} />;
    if (!username) return <div />;
    if (this.props.match.params.username !== username) this.getUser();

    return (
      <div className="UserPage mt-3">
        <div className="row p-3">
          <div className="col-xs-12 col-sm-4">
            <div className="card">
              <img src={profileImg} alt="header" className="card-img-top" />
              <div className="card-body">
                <div>
                  <b>{username}</b>
                </div>
                <div>{bio}</div>
                <div>{location}</div>
                {isAFoodTruck ? (
                  <div>
                    <Rater total={5} onRate={this.rateUser} rating={rating} />
                    <p>
                      <small>
                        Rated <span>{rating}</span> out of 5!
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
              <PostList type="user" id={id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
