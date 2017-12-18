import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Rater from 'react-rater'

import { fetchPosts } from '../store/actions/postActions';
import PostList from './posts-list';
import 'react-rater/lib/react-rater.css'

class MyAccount extends Component {
  state = {
    chowt: '',
    sendLocation: false,
  }

  newPost = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('x-auth');
      const headers = { 'x-auth': token };
      if (this.state.sendLocation) {
        if (!navigator.geolocation) {
          this.setState({ sendLocation: false });
          return alert('Geoloction not supported by your browser');
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
          const URL =  `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
          const locationMessage = `<p class='mb-0'><small><a href='${URL}' target="_blank">My Location</a></small></p>`;
          await axios.post('/chowt', { text: this.state.chowt + locationMessage }, { headers });
          this.setState({ chowt: '', sendLocation: false });
          this.props.fetchPosts();
        })
      } else {
        await axios.post('/chowt', { text: this.state.chowt }, { headers });
        this.setState({ chowt: '' });
      }
      this.props.fetchPosts();
    } catch (err) {
      alert('Post failed')
    }
  }

  handleChange = e => {
    if (e.target.id === 'sendLocation') return this.setState({ sendLocation: !this.state.sendLocation });

    this.setState({ chowt: e.target.value });
  }

  render() {
    let { chowt, sendLocation } = this.state;
    let { loggedIn, user } = this.props.appState;
    if (!loggedIn) return <div>Unauthorized user</div>;

    return (
      <div className="MyAccount">
        <div className="row p-3">
          <div className="col-xs-12 col-sm-4">
            <div className="card">
              <img src={user.profileImg} alt="header" className="card-img-top"/>
              <div className="card-body">
                <div><b>{user.username}</b></div>
                <div>{user.bio}</div>
                <div>{user.location}</div>
                <Rater total={5} interactive={false} rating={parseFloat(user.rating.average)}/>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-8">
            <div className="card">
              <div className="card-body">
                <form onSubmit={this.newPost}>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder='Chowt it out!'
                      className='form-control'
                      onChange={this.handleChange}
                      value={chowt}
                    />
                    <span className="input-group-btn">
                      <button className="btn btn-secondary" type='submit'>Send</button>
                    </span>
                  </div>
                  {
                    this.props.appState.user.isAFoodTruck ?
                    <div className="form-check text-right mb-0 mt-1">
                      <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" id='sendLocation' checked={sendLocation} onChange={this.handleChange} />
                        Send Location
                      </label>
                    </div> :
                    ''
                  }
                </form>
              </div>
              <PostList type='user' id={user._id} showDelete={true}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appState: state.appState
 });

const mapDispatchToProps = dispatch => {
  return bindActionCreators({fetchPosts}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
