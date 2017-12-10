import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import PostList from './posts-list';

class MyAccount extends Component {
  state = {
    chowt: '',
    key: 0,
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
          this.setState({ chowt: '', key: Math.random()*10000, sendLocation: false });
        })
      } else {
        await axios.post('/chowt', { text: this.state.chowt }, { headers });
        this.setState({ chowt: '', key: Math.random()*10000 });
      }
    } catch (err) {
      alert('Post failed')
    }
  }

  handleChange = e => {
    if (e.target.id === 'sendLocation') return this.setState({ sendLocation: !this.state.sendLocation });

    this.setState({ chowt: e.target.value });
  }

  render() {
    let { chowt, key } = this.state;
    let { loggedIn, user } = this.props.appState;
    if (!loggedIn) return <div>Unauthorized user</div>;

    return (
      <div className="MyAccount mt-3">
        <div className="row p-3">
          <div className="col-xs-12 col-sm-4">
            <div className="card">
              <img src="https://dummyimage.com/600x400/000/fff&text=Dummy+Header" alt="header" className="card-img-top"/>
              <div className="card-body">
                <div><b>{user.username}</b></div>
                <div>{user.bio}</div>
                <div>{user.location}</div>
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
                  <div className="form-check text-right mb-0 mt-1">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" id='sendLocation' onChange={this.handleChange} />
                      Send Location
                    </label>
                  </div>
                </form>
              </div>
              <PostList key={key} type='user' id={user._id} showDelete={true}/>
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

export default connect(mapStateToProps)(MyAccount);
