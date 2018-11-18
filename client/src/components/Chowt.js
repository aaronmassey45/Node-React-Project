import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import CHOWT from '../mutations/Chowt';
import query from '../queries/FetchUser';
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

      await chowt({
        variables: { ...body },
        refetchQueries: [
          {
            query,
            variables: {
              username: this.props.user.username,
            },
          },
        ],
      });

      this.setState({ chowt: '' });

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
    const { showModal, hide, user } = this.props;
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
                value={this.state.chowt}
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
                    checked={this.state.sendLocation}
                    onChange={this.handleChange}
                  />
                  Send Location
                </label>
              </div>
            )}
            {this.state.hasError && (
              <div className="alert alert-danger" role="alert">
                {this.state.errMsg
                  ? this.state.errMsg
                  : 'Post failed. Try again!'}
              </div>
            )}
          </form>
        )}
      </Mutation>
    );
  }
}

export default handleModal(Chowt);
