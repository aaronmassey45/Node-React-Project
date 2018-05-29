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
    errMsg: '',
  };

  handleChange = e => {
    if (e.target.id === 'sendLocation')
      return this.setState({ sendLocation: !this.state.sendLocation });
    this.setState({ chowt: e.target.value });
  };

  getPosition = () => {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  };

  submitChowt = async e => {
    e.preventDefault();
    const body = { text: this.state.chowt };

    try {
      if (this.state.sendLocation && this.props.user.isAFoodTruck) {
        if (!navigator.geolocation) {
          this.setState({ sendLocation: false });
          this.props.show();
          return;
        }

        await this.getPosition().then(res => {
          body.location = {
            lat: res.coords.latitude,
            lng: res.coords.longitude,
          };
        });
      }

      const token = localStorage.getItem('x-auth');
      const headers = { 'x-auth': token };

      await axios.post('/api/chowt', { ...body }, { headers });
      this.setState({ chowt: '', sendLocation: false, hasError: false }, () => {
        this.props.fetchPosts();
      });

      if (this.props.hideAfterSubmit) this.props.hideAfterSubmit();
    } catch (err) {
      this.setState(prevState => ({
        ...prevState,
        hasError: true,
        errMsg: err.message,
      }));
    }
  };

  render() {
    const { showModal, hide, isFetching, user } = this.props;
    return (
      <form onSubmit={this.submitChowt}>
        {showModal && (
          <Alert
            closeModal={() => hide()}
            msg="Geolocation not supported by your browser"
            bg="light"
          />
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
        {user.isAFoodTruck && (
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
        )}
        {this.state.hasError && (
          <div className="alert alert-danger" role="alert">
            {this.state.errMsg ? this.state.errMsg : 'Post failed. Try again!'}
          </div>
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
