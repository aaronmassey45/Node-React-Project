import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPosts } from '../store/actions/postActions';
import Alert from './alert';
import handleModal from './HOCs/handle-modal';

class Chowt extends Component {
  state = {
    chowt: '',
    hasError: false,
    sendLocation: false,
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

      if (this.state.sendLocation && this.props.user.isAFoodTruck) {
        if (!navigator.geolocation) {
          this.setState({ sendLocation: false });
          this.props.show();
          return;
        }

        navigator.geolocation.getCurrentPosition(async position => {
          await axios.post(
            '/api/chowt',
            {
              text: this.state.chowt,
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            },
            { headers }
          );
          this.setState({ chowt: '', sendLocation: false }, async () => {
            await this.props.fetchPosts();
          });
        });
      } else {
        await axios.post('/api/chowt', { text: this.state.chowt }, { headers });
        this.setState({ chowt: '' }, async () => {
          await this.props.fetchPosts();
        });
      }

      if (this.props.hideAfterSubmit) this.props.hideAfterSubmit();
    } catch (err) {
      this.setState({ hasError: true });
    }
  };

  render() {
    const { showModal, hide, isFetching, user } = this.props;
    return (
      <form onSubmit={this.submitChowt}>
        {showModal ? (
          <Alert
            closeModal={() => {
              hide();
            }}
            msg="Geolocation not supported by your browser"
            bg="light"
          />
        ) : (
          ''
        )}
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
              disabled={isFetching}
            >
              <i className="fa fa-paper-plane" /> Send
            </button>
          </span>
        </div>
        {user.isAFoodTruck ? (
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
  isFetching: state.appState.isFetching,
  user: state.appState.user,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchPosts }, dispatch);
};

let HandledChowt = handleModal(Chowt);

export default connect(mapStateToProps, mapDispatchToProps)(HandledChowt);
