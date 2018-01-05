import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPosts } from '../store/actions/postActions';

class Chowt extends Component {
  state = {
    chowt: '',
    hasError: false,
    sendLocation: false
  };

  handleChange = e => {
    if (e.target.id === 'sendLocation')
      return this.setState({ sendLocation: !this.state.sendLocation });
    this.setState({ chowt: e.target.value });
  };

  submitChowt = async e => {
    e.preventDefault();
    this.setState({ hasError: false });

    try {
      const token = localStorage.getItem('x-auth');
      const headers = { 'x-auth': token };
      if (this.state.sendLocation && this.props.appState.user.isAFoodTruck) {
        if (!navigator.geolocation) {
          this.setState({ sendLocation: false });
          return alert('Geoloction not supported by your browser');
        }

        navigator.geolocation.getCurrentPosition(async position => {
          const URL = `https://www.google.com/maps?q=${
            position.coords.latitude
          },${position.coords.longitude}`;
          const locationMessage = `<p class='mb-0'><small><a href='${URL}' target="_blank">My Location</a></small></p>`;
          await axios.post(
            '/chowt',
            { text: this.state.chowt + locationMessage },
            { headers }
          );
          this.setState({ chowt: '', sendLocation: false });
        });
      } else {
        await axios.post('/chowt', { text: this.state.chowt }, { headers });
        this.setState({ chowt: '' });
      }
      this.props.fetchPosts();
      if (this.props.hide) this.props.hide();
    } catch (err) {
      this.setState({ hasError: true });
    }
  };

  render() {
    return (
      <form onSubmit={this.submitChowt}>
        <div className="input-group">
          <input
            className="form-control"
            onChange={this.handleChange}
            placeholder="Chowt it out!"
            required
            type="text"
            value={this.state.chowt}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-secondary"
              type="submit"
              disabled={this.props.appState.isFetching}>
              <i className="fa fa-paper-plane" /> Send
            </button>
          </span>
        </div>
        {this.props.appState.user.isAFoodTruck ? (
          <div className="form-check text-right mb-0 mt-1">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                id="sendLocation"
                checked={this.state.sendLocation}
                onChange={this.handleChange}
              />
              Send Location
            </label>
          </div>
        ) : (
          ''
        )}
        {this.state.hasError ? (
          <div className="alert alert-danger" role="alert">
            Post failed. Try again!
          </div>
        ) : (
          ''
        )}
      </form>
    );
  }
}

const mapStateToProps = state => ({
  appState: state.appState
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchPosts }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Chowt);
