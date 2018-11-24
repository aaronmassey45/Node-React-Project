import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import CHOWT from '../mutations/Chowt';
import FETCH_USER from '../queries/FetchUser';
import GET_POSTS from '../queries/GetPosts';
import Alert from './Alert';
import handleModal from './HOCs/handle-modal';

class Chowt extends Component {
  state = {
    chowt: '',
    hasError: false,
    sendLocation: false,
    errMsg: '',
  };

  handleChange = e => {
    if (e.target.id === 'sendLocation') {
      this.setState(prevState => ({
        sendLocation: !prevState.sendLocation,
      }));
    } else {
      this.setState({ chowt: e.target.value });
    }
  };

  getPosition = () => {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  };

  submitChowt = async (e, chowt) => {
    e.preventDefault();
    const body = { text: this.state.chowt };
    const { user, show, hideAfterSubmit } = this.props;

    try {
      if (this.state.sendLocation && user.isAFoodTruck) {
        if (!navigator.geolocation) {
          this.setState({ sendLocation: false });
          show();
          return;
        }

        await this.getPosition().then(res => {
          body.location = {
            lat: res.coords.latitude,
            lng: res.coords.longitude,
          };
        });
      }

      await chowt({
        variables: { ...body },
        refetchQueries: [
          {
            query: FETCH_USER,
            variables: {
              username: user.username,
            },
          },
          { query: GET_POSTS },
        ],
      });

      this.setState({ chowt: '' });

      if (hideAfterSubmit) hideAfterSubmit();
    } catch (err) {
      this.setState(prevState => ({
        ...prevState,
        hasError: true,
        errMsg: err.message,
      }));
    }
  };

  render() {
    const { showModal, hide, user } = this.props;
    const { chowt: chowtInput, sendLocation, hasError, errMsg } = this.state;

    return (
      <Mutation mutation={CHOWT}>
        {chowt => (
          <form onSubmit={e => this.submitChowt(e, chowt)}>
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
                value={chowtInput}
              />
              <span className="input-group-btn">
                <button className="btn btn-secondary" type="submit">
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
                    checked={sendLocation}
                    onChange={this.handleChange}
                  />
                  Send Location
                </label>
              </div>
            )}
            {hasError && (
              <div className="alert alert-danger" role="alert">
                {errMsg ? errMsg : 'Post failed. Try again!'}
              </div>
            )}
          </form>
        )}
      </Mutation>
    );
  }
}

export default handleModal(Chowt);
